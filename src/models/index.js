"use strict";
require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");
const foodsSchema = require("./food");
const Clothes = require("./clothes");
const RecipesSchema = require("./recipes.model")
const IngredientsSchema = require("./ingredients.model")
const Collection = require('../lib/collection');

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URI;

let sequelizeOptions = process.env.NODE_ENV === "production" ?
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    } :
    {}

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions); 

const foodTable = foodsSchema(sequelize, DataTypes);
const recipesTable = RecipesSchema(sequelize, DataTypes);
const ingredientsTable = IngredientsSchema(sequelize, DataTypes);

const foodCollection  = new Collection(foodTable);
const recipesCollection = new Collection(recipesTable);
const ingredientsCollection = new Collection(ingredientsTable);


  foodTable.hasOne(ingredientsTable, {
    foreignKey: 'foodId',
    sourceKey: 'id',
  });
  
  ingredientsTable.belongsTo(foodTable, {
    foreignKey: 'foodId',
    targetKey: 'id',
  });
  
  foodTable.hasMany(recipesTable, {
    foreignKey: 'foodId',
    sourceKey: 'id',
  });
  
  recipesTable.belongsTo(foodTable, {
    foreignKey: 'foodId',
    targetKey: 'id',
  });


module.exports = {
    db: sequelize,
    Clothes: Clothes(sequelize, DataTypes),
    FoodModel: foodCollection,
    RecipeModel: recipesCollection,
    IngredientModel: ingredientsCollection,
   
};

