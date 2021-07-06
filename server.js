'use strict'

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

const { getCoktail, addToFav, getFav, deleteFav,updateFav } = require('./Controllers/Cocktail.controller')

mongoose.connect('mongodb://localhost:27017/art', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// a server endpoint to check if it's working
app.get('/', (req, res) => {
    res.send('Good Job');
})

app.get('/cocktail', getCoktail)

app.post('/cocktail/favorite', addToFav)
app.get('/cocktail/favorite', getFav)
app.put('/cocktail/favorite/:idx',updateFav)
app.delete('/cocktail/favorite/:idx', deleteFav)

app.listen(PORT, () => {
    console.log(`I'm listening`)
})
