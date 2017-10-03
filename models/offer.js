'use strict';
module.exports = (sequelize, DataTypes) => {
  var Offer = sequelize.define('Offer', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type:DataTypes.STRING,
      unique: true,
      required: true
    },
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    disposable: DataTypes.BOOLEAN,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    percentage_discount: DataTypes.INTEGER,
    currency_discount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }

  });
  Offer.associate = (models) => {
    console.log("ASSOCIATION");

  };
  return Offer;
};