'use strict'; 
require('dotenv').config();
const express = require("express");
const app = express();
const notFoundHandler = require("../src/error-handlers/404");
const errorHandler = require("../src/error-handlers/500");
const FoodRouter = require("../src/routes/food");
const ClothesRouter = require("../src/routes/clothes");

app.use(express.json());
app.use(ClothesRouter);
app.use(FoodRouter);
app.use(errorHandler); 


app.get('/', welcomeHandler);
function welcomeHandler(req, res) {
    res.status(200).send('hi');
}

function start(port) {
    app.listen(port, () => {
        console.log(`Listen and Running on port ${port}`);
    });
}

app.use(notFoundHandler);

module.exports = {
    app: app,
    start: start,
};
