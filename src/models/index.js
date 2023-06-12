"use strict";
require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");
const Food = require("./food");
const Clothes = require("./clothes");

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
  
  
  

module.exports = {
    db: sequelize,
    Food: Food(sequelize, DataTypes),
    Clothes: Clothes(sequelize, DataTypes)
};

