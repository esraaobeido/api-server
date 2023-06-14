const express = require('express');
const RecipeRouter = express.Router();
const { RecipeModel } = require('../models/index');

RecipeRouter.get("/recipe", getAllRecipe);
RecipeRouter.get("/recipe/:id", getOneRecipe);
RecipeRouter.post("/recipe", createRecipe);
RecipeRouter.put("/recipe/:id", updateRecipe);
RecipeRouter.delete("/recipe/:id", deleteRecipe);

async function getAllRecipe(req, res) {
    let recipeResult = await RecipeModel.read();
    res.status(200).json(recipeResult);
}

async function getOneRecipe(req, res) {
    const RecipeId = parseInt(req.params.id);
    let Recipe = await RecipeModel.read(RecipeId)
    res.status(200).json(Recipe);
}
async function createRecipe(req, res) {
    let newRecipe = req.body;
    let Recipe = await RecipeModel.add(newRecipe);
    res.status(201).json(Recipe);
}
async function updateRecipe(req, res) {
    let RecipeId = parseInt(req.params.id);
    let updateRecipe = req.body;
    let foundRecipe = await RecipeModel.update(updateRecipe, RecipeId);
    res.status(201).json(foundRecipe);
}
async function deleteRecipe(req, res) {
    let RecipeId = parseInt(req.params.id);
    let deleteRecipe = await RecipeModel.delete(RecipeId);
    res.status(204).json(deleteRecipe);
}

module.exports = RecipeRouter;