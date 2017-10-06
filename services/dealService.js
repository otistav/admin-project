const project_config = require('../config/project_config');
const db = require('../models/index');
const dealUtil = require('../utils/dealUtil');


exports.getUserDeals = (user_id) => {
  return db.Deal.findAll({where: {customer_id: user_id}, include: [{all: true}]});
};


exports.getDealById = (deal_id) => {
  return db.Deal.findById(deal_id);
};


exports.getAllDeals = () => {
  return db.Deal.findAll({include: [{all:true}]});
};


