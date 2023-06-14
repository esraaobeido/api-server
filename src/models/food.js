"use strict";
const Food = (sequelize, DataTypes) =>
    sequelize.define("Food", {
        FoodType: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

module.exports = Food;
