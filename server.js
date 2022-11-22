require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')

const pokemon = require('./models/pokemon')

const PORT = process.env.PORT || 3000
const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/static', express.static('public'))

// Index
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
        pokemons: pokemon
    })
})

// Show
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {
        pokemon: pokemon[req.params.id],
    })
    
})

app.listen(PORT, () => {
    console.log(`Can you hear the love on port: ${PORT}`)
})