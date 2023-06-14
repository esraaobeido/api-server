const express = require('express');
const IngredientRouter = express.Router();
const { IngredientModel } = require('../models/index');

IngredientRouter.get("/ingredient", getAllIngredient);
IngredientRouter.get("/ingredient/:id", getOneIngredient);
IngredientRouter.post("/ingredient", createIngredient);
IngredientRouter.put("/ingredient/:id", updateIngredient);
IngredientRouter.delete("/ingredient/:id", deleteIngredient);

async function getAllIngredient(req, res) {
    let ingredientResult = await IngredientModel.read();
    res.status(200).json(ingredientResult);
}

async function getOneIngredient(req, res) {
    const IngredientId = parseInt(req.params.id);
    let Ingredient = await IngredientModel.read(IngredientId)
    res.status(200).json(Ingredient);
}
// async function createIngredient(req, res) {
//     let newIngredient = req.body;
//     newIngredient.foodId = foodId;
//     let Ingredient = await IngredientModel.add(newIngredient);
//     res.status(201).json(Ingredient);
// }
async function createIngredient(req, res) {
    try {
      let newIngredient = req.body;
            if (!newIngredient.foodId) {
        return res.status(400).json({ error: 'foodId is required' });
      }
      let createdIngredient = await IngredientModel.add(newIngredient);
      res.status(201).json(createdIngredient);
    } catch (error) {
      console.error('Error creating ingredient:', error);
      res.status(500).json({ error: 'Failed to create ingredient' });
    }
  }
  
  
async function updateIngredient(req, res) {
    let IngredientId = parseInt(req.params.id);
    let updateIngredient = req.body;
    let foundIngredient = await IngredientModel.update(updateIngredient, IngredientId);
    res.status(201).json(foundIngredient);
}
async function deleteIngredient(req, res) {
    let IngredientId = parseInt(req.params.id);
    let deleteIngredient = await IngredientModel.delete(IngredientId);
    res.status(204).json(deleteIngredient);
}

module.exports = IngredientRouter;