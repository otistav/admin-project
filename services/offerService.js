const project_config = require('../config/project_config');
const db = require('../models/index');
const Nodegeocoder = require('node-geocoder');
const dealUtil = require('../utils/dealUtil');
let should_sum = require('../utils/settings');

var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  formatter: null         // 'gpx', 'string', ...
};
const geocoder = Nodegeocoder(options);

exports.create = (options) => {                           //создание предложения

  return Promise.resolve()
    .then(() => {
      console.log('geocode');
      if (options && options.location)
        return geocoder.geocode(options.location);
    })
    .then(geolocation => {
      console.log('this is geolocetion', geolocation);
      return db.Offer.create({
        name: options.name,
        description: options.description,
        image: options.image.substr(9, options.image.length),
        disposable: options.disposable,
        percentage_discount: options.percentage_discount,
        currency_discount: options.currency_discount,
        percentage_discount_limit: options.percentage_discount_limit,
        currency_discount_limit: options.currency_discount_limit,
        cost: options.cost,
        use_bonus: options.use_bonus
      })
    })
};


exports.findOne = (offer_id, include_discount, user_id) => {
  if (!include_discount) return db.Offer.findById(offer_id);
  if (should_sum.date && should_sum.value && Date.now() - should_sum.date < project_config.one_minute*10) {             //если настройки из модуля не старше десяти минут, то берем их оттуда
    return Promise.all([
      db.Offer.findById(offer_id),
      db.Score.findAll({where: {user_id: user_id}}),
    ])
      .then(([offer, scores]) => {
        let final_discount;
        if (offer.percentage_discount) {
          final_discount = dealUtil.calculatePercentageDiscount(scores, offer, Number(should_sum.value));               //ищем счет и предложение и считаем процентную скидку или валютную скидку
        }
        if (offer.currency_discount) {
          final_discount = dealUtil.calculateCurrencyDiscount(scores, offer, Number(should_sum.value));
        }
        return {offer, final_discount: final_discount}
      })
  }
  else {                                                                                                                //иначе запрашиваем из базы
    return Promise.all([
      db.Offer.findById(offer_id),
      db.Score.findAll({where: {user_id: user_id}}),
      db.Settings.findOne({where: {key: 'sum_discount'}})
    ])
      .then(([offer, scores, setting]) => {
        should_sum.date = Date.now();
        should_sum.value = setting.value;
        let final_discount;
        if (offer.percentage_discount) {
          final_discount = dealUtil.calculatePercentageDiscount(scores, offer, Number(setting.value));
        }
        if (offer.currency_discount) {
          final_discount = dealUtil.calculateCurrencyDiscount(scores, offer, Number(setting.value));
        }
        return {offer, final_discount: final_discount}
      })
  }


};


exports.findAll = (include_discount, user_id) => {
  console.log(typeof include_discount, 'this is includediscount');
  if (!include_discount) return db.Offer.findAll();
  if (should_sum.date && should_sum.value && Date.now() - should_sum.date < project_config.one_minute*10) {
    return Promise.all([
      db.Offer.findAll(),
      db.Score.findAll({where: {user_id: user_id}}),
    ])
      .then(([offers, scores]) => {
        let offersWithDiscount = [];
        offers.forEach(offer => {
          let final_discount;
          if (offer.percentage_discount) {
            final_discount = dealUtil.calculatePercentageDiscount(scores, offer, Number(should_sum.value));
          }
          if (offer.currency_discount) {
            final_discount = dealUtil.calculateCurrencyDiscount(scores, offer, Number(should_sum.value));
          }
          offersWithDiscount.push({offer, final_discount: final_discount});
        });
        return offersWithDiscount
      })
  }
  return Promise.all([
    db.Offer.findAll(),
    db.Score.findAll({where: {user_id: user_id}}),
    db.Settings.findOne({where: {key: 'sum_discount'}})
  ])
    .then(([offers, scores, setting]) => {
      should_sum.value = setting.value;
      should_sum.date = Date.now();
      let offersWithDiscount = [];
      offers.forEach(offer => {
        let final_discount;
        if (offer.percentage_discount) {
          final_discount = dealUtil.calculatePercentageDiscount(scores, offer, Number(setting.value));
        }
        if (offer.currency_discount) {
          final_discount = dealUtil.calculateCurrencyDiscount(scores, offer, Number(setting.value));
        }
        offersWithDiscount.push({offer, final_discount: final_discount});
      });
      return offersWithDiscount
    })
};


exports.delete = (offer_id) => {
  return db.sequelize.transaction(t => {
    return db.Deal.destroy({where: {offer_id: offer_id}, transaction: t})
      .then((result) => {
        return db.Offer.destroy({where: {uuid: offer_id}})
      })
  })

};


exports.edit = (offer_id, options) => {
  return Promise.resolve()
    .then(() => {
      if (options && options.location)
        return geocoder.geocode(options.location);
    })
    .then(geocode => {
      return db.Offer.findById(offer_id)
        .then(offer => {
          if (!offer) throw new Error('offer doesnt exist');
          if (options.name) offer.name = options.name;
          if (options.description) offer.description = options.description;
          if (options.image) offer.image = options.image.substr(9, options.image.length);
          if (options.disposable) offer.disposable = options.disposable;
          if (options.percentage_discount) {
            offer.currency_discount = null;
            offer.percentage_discount = options.percentage_discount;
          }
          if (options.currency_discount) {
            offer.percentage_discount = null;
            offer.currency_discount = options.currency_discount;
          }
          if (options.currency_discount_limit) {
            offer.currency_discount_limit = options.currency_discount_limit;
            offer.percentage_discount_limit = null;
          }
          if (options.percentage_discount_limit) {
            offer.currency_discount_limit = null;
            offer.percentage_discount_limit = options.percentage_discount_limit;
          }
          if (geocode) {
            offer.latitude = geocode[0].latitude;
            offer.langitude = geocode[0].langitude;
          }
          if (options.cost) offer.cost = options.cost;
          if (options.useBonus) offer.useBonus = options.useBonus;
          return offer.save();
        })
    })

};


exports.useOffer = (user_id, offer_id) => {
  return db.sequelize.transaction(t => {
    return db.Offer.findById(offer_id, {transaction: t})                                                                        //ищем предложение
      .then(offer => {
        return db.Deal.findAll({where: {offer_id: offer_id, customer_id: user_id}, transaction: t, include: [{all:true}]})      //по предложению ищем сделки этого юзера связанные с этим предложением
          .then(deals => {
            if (offer.disposable && deals.length !== 0) throw new Error('offer is disposable');                                 // если сделка уже есть и предложение одноразовое, то выбрасываем ошибку
            return Promise.all([                                                                                                // получаем предлоежние, счета юзера в игре для подсчета бонусной скидки и настройки
              db.Offer.findById(offer_id),
              db.Score.findAll({where: {user_id:user_id}}, {transaction: t}),
              db.Settings.findOne({where: {key: 'sum_discount'}})
            ])
          })
          .then(([offer, scores, setting]) => {
            let final_discount;
            if (offer.percentage_discount) {
              final_discount = dealUtil.calculatePercentageDiscount(scores, offer, Number(setting.value));
            }
            if (offer.currency_discount) {
              final_discount = dealUtil.calculateCurrencyDiscount(scores, offer, Number(setting.value));
            }
            return db.Deal.create({
              customer_id: user_id,
              offer_id: offer_id,
              final_discount: final_discount
            })
          })
      })

  })
};

