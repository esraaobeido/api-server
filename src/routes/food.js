"use strict";
const express = require("express");
const FoodRouter = express.Router();
const { FoodModel,IngredientModel,RecipeModel  } = require("../models/index");
const Collection = require('../lib/collection');

FoodRouter.get("/food", getAllFoods);
FoodRouter.get("/food/:id", getOneFood);
FoodRouter.post("/food", createFood);
FoodRouter.put("/food/:id", updateFood);
FoodRouter.delete("/food/:id", deleteFood);

//-----------------------------------------------------------------
FoodRouter.get("/foodIngredients/:id", foodIngredients);
async function foodIngredients(req, res) {
    const FoodId = parseInt(req.params.id);
    let foodIngredientsResult = await IngredientModel.readFoodIngredients(FoodId);
    res.status(200).json(foodIngredientsResult);
}

FoodRouter.get("/foodRecipes/:id", foodRecipes);
async function foodRecipes(req, res) {
    const FoodId = parseInt(req.params.id);
    let foodRecipesResult = await FoodModel.readFoodRecipes(FoodId, RecipeModel.model);
    res.status(200).json(foodRecipesResult);
}


//---------------------------------------------------------------
async function getAllFoods(req, res) {
    let FoodResult = await FoodModel.read();
    res.status(200).json(FoodResult);
}

async function getOneFood(req, res) {
    const FoodId = parseInt(req.params.id);
    let Food = await FoodModel.read(FoodId)
    res.status(200).json(Food);
}
async function createFood(req, res) {
    let newFood = req.body;
    let Food = await FoodModel.add(newFood);
    res.status(201).json(Food);
}
async function updateFood(req, res) {
    let FoodId = parseInt(req.params.id);
    let updateFood = req.body;
    let foundFood = await FoodModel.update(updateFood, FoodId);
    res.status(201).json(foundFood);
}
async function deleteFood(req, res) {
    let FoodId = parseInt(req.params.id);
    let deleteFood = await FoodModel.delete(FoodId);
    res.status(204).json(deleteFood);
}


module.exports = FoodRouter;