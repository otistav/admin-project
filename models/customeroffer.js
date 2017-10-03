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
  return CustomerOffer;
};