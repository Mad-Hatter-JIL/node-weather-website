const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//nodemon src/app.js -e js,hbs

//define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Handlebars Title',
        name: 'Ian'
    })
})

//app.com/help
app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Welcome to the help page',
        name: 'admin',
        paragraph: 'This is a page dedicated to the assistance of the nobodies that will be visiting it. Please help yourself to the abundance of info provided.'
    })
})

//app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ian Liszewski',
        age: 28
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                return res.send({
                    location,
                    forecast: forecastData
                })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    var inactivePage = req.originalUrl;
    res.render('404', {
        title: '404 Page',
        name: 'Ian Liszewski',
        errorMessage: 'This help page does not exist'
    })
})

app.get('*', (req, res) => {
    var inactivePage = req.originalUrl;
    res.render('404', {
        title: '404 Page',
        name: 'Ian Liszewski',
        errorMessage: '404 ' + inactivePage + ' page not found'
    })
})

//start up web server using common dev port 3000
app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})

// // app.com
// app.get('',(req, res) => {
//     res.send('<H1>Hello Node</H1>')
// })

