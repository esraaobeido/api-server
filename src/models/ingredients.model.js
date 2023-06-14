'use strict';
const Ingredients = (sequelize, DataTypes) =>
    sequelize.define("ingredients", {
        IngredientName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        foodId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })


module.exports = Ingredients;