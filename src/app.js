const path = require('path')// loading path module
const express = require('express')  //loaded express module to make server
const hbs = require('hbs')
const geocode = require('./utils/geocode')  //adding modules of geting coordinates and location
const forecast = require('./utils/forecast')

const app = express() //server made

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') //batado ki hbs add krre h isme
app.set('views', viewsPath) //set path of views where hbs files are put
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //static public folder loaded

//now we will tell what it will show when open url


app.get('', (req, res) => {
    res.render('index', {  //render is used for dynamic webpage and libray used is handlebars
        title: 'Weather',
        name: 'Karan Kamboj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Karan Kamboj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Karan Kamboj'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {  //used to get to localhost:300/products?search=toys  ke last valistring
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Karan Kamboj',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {  //it is like else bakio p na chla to ye vala chlega means error vale page isi p jaege sare
    res.render('404', {
        title: '404',
        name: 'Karan Kamboj',
        errorMessage: 'Page not found.'
    })
})

//server started
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})