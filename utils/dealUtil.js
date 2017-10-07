const scoreUtil = require('../utils/scoreUtil');


exports.calculatePercentageDiscount = (scores, offer, should_sum_discount) => {
  let totalScore = scoreUtil.calculateTotal(scores, 'month');
  let bonus_discount = 1+ totalScore/10040;
  if (should_sum_discount) {
    if (offer.use_bonus) {
      if (offer.percentage_discount_limit > (bonus_discount + offer.percentage_discount)) {
        return bonus_discount + offer.percentage_discount
      }
      else {
        return offer.percentage_discount_limit;
      }
    }
    else {
      return offer.percentage_discount;
    }
  }
  else {
    if (offer.use_bonus && offer.percentage_discount_limit > bonus_discount &&
      offer.percentage_discount < bonus_discount) {                              //Если предложение разрешает бонусы, бонусная скидка не превышает лимит и бонусная скидка больше чем дефолтная
      return bonus_discount                                                      //то возвращаем бонусную скидку
    }
    return offer.percentage_discount;                                           // иначе возвращаем дефолтную скидку
  }
};


exports.calculateCurrencyDiscount = (scores, offer, should_sum_discount) => {
  let totalScore = scoreUtil.calculateTotal(scores, 'month');
  let bonus_percentage_discount = 1+ totalScore/1000;//считаем скидку в процентах
  let bonus_discount = offer.cost / bonus_percentage_discount;// считаем скидку в валюте
  if (should_sum_discount) {

    if (offer.use_bonus) {

      if (offer.currency_discount_limit > (bonus_discount + offer.currency_discount)) {
        return bonus_discount + offer.currency_discount;
      }
      else {
        return offer.currency_discount_limit;
      }
    }
    else {
      return offer.currency_discount;
    }
  }
  else {
    if (offer.use_bonus && offer.currency_discount_limit > bonus_discount &&
      offer.currency_discount < bonus_discount) {
      return bonus_discount;
    }
    return offer.currency_discount;
  }
};
