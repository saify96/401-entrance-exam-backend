'use strict';

const axios = require('axios');
const cocktailSchemaModel = require('../Models/Cocktail.Model')

const getCoktail = async (req, res) => {
    await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`).then(response => {
        let arrOfCocktails = response.data;
        res.send(arrOfCocktails)
    }).catch(error => {
        console.log('=============')
        console.log('An error occoured')
        console.log(error.message)
        console.log('=============')
    })
};

const addToFav = async (req, res) => {
    const {
        strDrink,
        strDrinkThumb,
        idDrink
    } = req.body;
    console.log(req.body)
    cocktailSchemaModel.find({ idDrink: idDrink }, (error, data) => {
        if (data.length > 0) {
            res.send('data already exists');
        } else {
            const newObj = new cocktailSchemaModel({
                strDrink: strDrink,
                strDrinkThumb: strDrinkThumb,
                idDrink:idDrink
            })
            newObj.save();
            res.send(data);
        }
    })
};

const getFav = async (req, res) => {
    cocktailSchemaModel.find({}, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
};

const deleteFav = async (req, res) => {
    const idx = req.params.idx;
    cocktailSchemaModel.find({}, (error, data) => {
        if (error) {
            res.send(error)
        } else {
            data[idx].remove();
            // res.send(data);
            cocktailSchemaModel.find({}, (error, data) => {
                res.send(data);
            })
        }
    })

}

const updateFav = async (req, res) => {
    const idx = req.params.idx;
    const {
        strDrink,
        strDrinkThumb,
    } = req.body;
    cocktailSchemaModel.find({}, (error, data) => {
        if (error) {
            res.send(error)
        } else {
            data[idx].strDrink=strDrink;
            data[idx].strDrinkThumb=strDrinkThumb;
            data[idx].save();
            res.send(data);
        }
    })
}

module.exports = { getCoktail, addToFav, getFav, deleteFav,updateFav };