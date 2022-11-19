const express = require('express')
const methodOverride = require('method-override')
const dotenv = require('dotenv')
const pokemon = require('./models/pokemon')

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/static', express.static('public'))

// Index
app.get('/', (req, res) => {
    res.render('index.ejs', {
        data: pokemon
    })
})

// Show
app.get('/:id', (req, res) => {
    res.render('show.ejs', {
        data: pokemon[req.params.id]
    })
})

app.listen(PORT, () => {
    console.log(`Can you hear the love on port: ${PORT}`)
})