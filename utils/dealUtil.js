const scoreUtil = require('../utils/scoreUtil');


exports.calculatePercentageDiscount = (scores, offer, should_sum_discount) => {                         //считает бонусную скидку в процентах
  let totalScore = scoreUtil.calculateTotal(scores, 'month');
  let bonus_discount = 1+ totalScore/10040;                                                             //процентная бонусная скидка
  if (should_sum_discount) {                                                                            // если в настройках указано, что надо суммировать
    if (!offer.use_bonus) return offer.percentage_discount;                                                                             //если не используем бонус, то
    if (offer.percentage_discount_limit > (bonus_discount + offer.percentage_discount)) {             // если лимит больше чем сумма бонуса и текущей скидки
      return bonus_discount + offer.percentage_discount                                               // значит суммируем
    }
    else {
      return offer.percentage_discount_limit;                                                         //если лимит меньше, тогда возвращаем лимит
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

    if (!offer.use_bonus) return offer.currency_discount;

      if (offer.currency_discount_limit > (bonus_discount + offer.currency_discount)) {
        return bonus_discount + offer.currency_discount;
      }
      else {
        return offer.currency_discount_limit;
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
