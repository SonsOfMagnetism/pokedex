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
app.use(express.static('public'))

// Index
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
        pokemons: pokemon
    })
})

// New
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs', {
        pokemon: pokemon,
    })
})

// Destroy
app.delete('/pokemon/:id', (req, res) => {
    const id = parseInt(pokemon.id) - 1
    pokemon.splice(id, 1)
    res.redirect('/pokemon')
})

// Update
app.put('/pokemon/:id', (req, res) => {
    pokemon[req.params.id] = req.body
    console.log(req.body)
    res.redirect('/pokemon')
})

// Create
app.post('/pokemon', (req, res) => {
    pokemon.push(req.body)
    console.log(req.body)
    res.redirect('/pokemon')
})

// Edit
app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        pokemon: pokemon[req.params.id],
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