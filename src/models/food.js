"use strict";
const Food = (sequelize, DataTypes) =>
    sequelize.define("Food", {
        // FoodId: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        FoodType: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

module.exports = Food;
