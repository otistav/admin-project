const project_config = require('../config/project_config');
const db = require('../models/index');
const Nodegeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  formatter: null         // 'gpx', 'string', ...
};
const geocoder = Nodegeocoder(options);

exports.create = (options) => {

  return Promise.resolve()
    .then(() => {
      console.log('geocode');
      return geocoder.geocode(options.location)
    })
    .then(geolocation => {
      console.log('this is geolocetion', geolocation);
      return db.Offer.create({
        name: options.name,
        description: options.description,
        image: options.image,
        disposable: options.disposable,
        latitude: geolocation[0].latitude,
        longitude: geolocation[0].longitude,
        percentage_discount: options.percentage_discount,
        currency_discount: options.currency_discount,
        percentage_discount_limit: options.percentage_discount_limit,
        currency_discount_limit: options.currency_discount_limit,
        cost: options.cost,
        use_bonus: options.use_bonus
      })
    })
};


exports.findOne = (offer_id) => {
  return db.Offer.findById(offer_id)
};


exports.findAll = () => {
  return db.Offer.findAll();
};


exports.delete = (offer_id) => {
  return db.sequelize.transaction(t => {
    return db.CustomerOffer.destroy({where: {offer_id: offer_id}, transaction: t})
      .then((result) => {
        return db.Offer.destroy({where: {uuid: offer_id}})
      })
  })

};


exports.edit = (offer_id, options) => {
  return Promise.resolve()
    .then(() => {
      if (options.location)
        return geocoder.geocode(options.location);
    })
    .then(geocode => {
      return db.Offer.findById(offer_id)
        .then(offer => {
          if (!offer) throw new Error('offer doesnt exist');
          if (options.name) offer.name = options.name;
          if (options.description) offer.description = options.description;
          if (options.image) offer.image = options.image;
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
          if (options.useBonus) offer.useBonus = options.useBonus;
          return offer.save();
        })
    })

};


exports.useOffer = (user_id, offer_id) => {
  return db.sequelize.transaction(t => {
    return db.Offer.findById(offer_id, {transaction: t})
      .then(offer => {
        if (!offer) throw new Error();
        return db.CustomerOffer.findAll({where: {offer_id: offer_id, customer_id: user_id}, transaction: t})
          .then(customerOffers => {
            if (offer.disposable && customerOffers.length !== 0) throw new Error('Offer is disposable'); //TODO добавить кастомную ошибку
          })
      })
      .then(() => {
        return db.CustomerOffer.create({
          customer_id: user_id,
          offer_id: offer_id}, {transaction: t})
    })
  })
};

