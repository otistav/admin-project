
const project_config = require('../config/project_config');

//TODO оптимизировать функции. Антон, сюда можешь не смотреть, разобраться тяжело. Я позже оптимизирую. Они работают. Здесь так же учитывается настройка(складывать скидки или брать большую)

exports.calculatePercentageDiscount = (scores, deal, should_sum_discount) => {
  let totalScore = 0;
  scores.forEach(score => {                                                      //Считаем счет для юзера за последний месяц
    if (deal.createdAt - score.updatedAt < project_config.one_month) {
      totalScore += score.value;
    }
  });
  let offer = deal.Offer;
  let bonus_discount = 1+ totalScore/3000;
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


exports.calculateCurrencyDiscount = (scores, deal, should_sum_discount) => {
  let totalScore = 0;
  scores.forEach(score => {                                                      //Считаем счет для юзера за последний месяц
    if (deal.createdAt - score.updatedAt < project_config.one_month) {
      totalScore += score.value;
    }
  });
  let offer = deal.Offer;
  let bonus_percentage_discount = 1+ totalScore/3000;                            //считаем скидку в процентах
  let bonus_discount = offer.cost / bonus_percentage_discount;
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
