'use strict';
const Recipe  = (sequelize, DataTypes) =>
    sequelize.define("recipes", {
        RecipeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        foodId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })


module.exports = Recipe ;