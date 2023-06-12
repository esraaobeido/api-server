"use strict";
const express = require("express");
const FoodRouter = express.Router();
const { Food } = require("../models/index");

FoodRouter.get("/food", getFood);
FoodRouter.get("/food/:id", getOneFood);
FoodRouter.post("/food", createFood);
FoodRouter.put("/food/:id", updateFood);
FoodRouter.delete("/food/:id", deleteFood);

async function getFood(req, res) {
    const foodResult = await Food.findAll();
    res.status(200).json(foodResult);
}


async function getOneFood(req, res) {
    const foodId = parseInt(req.params.id);
    let food = await Food.findOne({
        where: {
            id: foodId
        }
    })
    res.status(200).json(food);
}


async function createFood(req,res) {
    let food=req.body;
    console.log(food);
    let foodResult=await Food.create(food);
    res.status(201).json(foodResult);

}

async function updateFood(req, res) {
    let foodId = parseInt(req.params.id);
    let updateFood = req.body; 
    let foundFood = await Food.findOne({ where: { id: foodId } });
    let updatedFood= await foundFood.update(updateFood);
    res.status(201).json(updatedFood);
}


async function deleteFood(req,res) {
    let foodId=req.params.id;
    let deleteFood=await Food.destroy({
        where: {
            id: foodId
        }
    });
    res.status(204).json(deleteFood);
}

module.exports = FoodRouter;