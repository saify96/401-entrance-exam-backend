'use strict';
const mongoose = require('mongoose');

const coktailSchema = mongoose.Schema({
    strDrink:String,
    strDrinkThumb:String,
    idDrink:Number
})

const cocktailSchemaModel = mongoose.model('cocktail',coktailSchema);

module.exports = cocktailSchemaModel;