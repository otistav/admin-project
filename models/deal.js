'use strict';
module.exports = (sequelize, DataTypes) => {
  var Deal = sequelize.define('Deal', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    customer_id: DataTypes.UUID,
    offer_id: DataTypes.UUID,
    final_discount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Deal.associate = (models) => {
    Deal.belongsTo(models.User, {as: 'Customer', foreignKey: 'customer_id'});
    Deal.belongsTo(models.Offer, {foreignKey: 'offer_id'});
  };
  return Deal;
};