const project_config = require('../config/project_config');
const db = require('../models/index');
const dealUtil = require('../utils/dealUtil');


exports.getUserDeals = (user_id) => {
  return db.sequelize.transaction(t => {
    // let Promise = require('bluebird');
    return Promise.all([
        db.CustomerOffer.findAll({where: {customer_id: user_id}, include: [{all:true}]}, {transaction: t}),
        db.Score.findAll({where: {user_id:user_id}}, {transaction: t}),
        db.Settings.findOne({where: {key: 'sum_discount'}})
    ])
      .then(([deals, scores, setting]) => {
        let resultDeals = [];
        deals.forEach(deal => {
          if (deal.Offer.percentage_discount) {
            deal.Offer.percentage_discount = dealUtil.calculatePercentageDiscount(scores, deal, Number(setting.value));
            resultDeals.push(deal);
          }
          if (deal.Offer.currency_discount) {
            deal.Offer.currency_discount = dealUtil.calculateCurrencyDiscount(scores, deal, Number(setting.value));
            resultDeals.push(deal);
          }
        });
        return resultDeals;

      })
    // return db.CustomerOffer.findAll({where: {customer_id: user_id}, include: [{all: true}]}, {transaction: t})    //ищем сделки
    //   .then(deals => {
    //     return db.Score.findAll({where: {user_id: user_id}}, {transaction: t})                                    //ищем счет юзера
    //       .then(scores => {
    //         return db.Settings.findOne({where: {key: 'sum_discount'}})
    //           .then()
    //         let resultDeals = [];                                                                                 // заводим новый массив для результата
    //         deals.forEach(deal => {
    //           deal.Offer.percentage_discount = calculateDiscount(scores, deal);                                   //для каждой сделки перерасчитываем скидку
    //           resultDeals.push(deal);                                                                             //пушим сделку и возвращаем результат
    //         });
    //         return resultDeals;
    //       })
    //   })
  })
};


exports.getDealById = (deal_id) => {

  return db.sequelize.transaction(t => {
    return Promise.all([
      db.CustomerOffer.findById(deal_id, {include: [{all:true}], transaction: t}),
      db.Score.findAll({where: {user_id: deal.customer_id}}, {transaction: t}),
      db.Settings.findOne({where: {key: 'sum_discount'}})
    ])
      .then(([deal, scores, setting]) => {
        if (deal.Offer.percentage_discount) {
          deal.Offer.percentage_discount = dealUtil.calculatePercentageDiscount(scores, deal, Number(setting.value));
          return deal;
        }
        if (deal.Offer.currency_discount) {
          deal.Offer.currency_discount = dealUtil.calculateCurrencyDiscount(scores, deal, Number(setting.value));
          return deal;
        }
      })
  })

};


