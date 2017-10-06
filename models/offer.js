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
    currency_discount: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    use_bonus: DataTypes.BOOLEAN,
    percentage_discount_limit: DataTypes.INTEGER,
    currency_discount_limit: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }

  });
  Offer.associate = (models) => {
    console.log("ASSOCIATION");
    Offer.belongsToMany(models.User, {through: models.Deal, as: 'customers', foreignKey: 'offer_id'})
  };
  return Offer;
};