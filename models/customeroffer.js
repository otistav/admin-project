'use strict';
module.exports = (sequelize, DataTypes) => {
  var CustomerOffer = sequelize.define('CustomerOffer', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    customer_id: DataTypes.UUID,
    offer_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  CustomerOffer.associate = (models) => {
    CustomerOffer.belongsTo(models.User, {as: 'Customer', foreignKey: 'customer_id'});
    CustomerOffer.belongsTo(models.Offer, {foreignKey: 'offer_id'});
  };
  return CustomerOffer;
};