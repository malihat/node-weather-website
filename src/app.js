const path = require('path')
// creating a function from express library
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// call the express function to make application.
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// here we tell express which templating engine we installed. hbs is handlebar
// Setup handlbars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Maliha'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: 'Maliha'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Help Page to help you'
    })
})
// app.get('', (req, res) => {
//     // send something back to the requester
//     res.send('Hello express')
// });

// app.get('/help', (req, res) => {
//     // send something back to the requester
//     res.send('Help Page');
// });

// app.get('/about', (req, res) => {
//     // send something back to the requester
//     res.send('<h1> About Page </h1>')
// });

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a search term"
        }); 
    }
    
    geocode(req.query.address, (error, {Latitude, Longitude, Location}) => {
        if (error) {
            return res.send({ error }); 
        }
        forecast(Latitude, Longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location: Location,
                forecast: forecastData,
                address: req.query.address });
          
    
        });
    
        // console.log('Data: ', data);
    });

    // send something back to the requester
    // res.send({ 
    //     forecast: 'The weather is really good',
    //     location: 'Philadelphia' ,
    //     address: req.query.address
    // });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('handleError', {
        title: '404',
        name: 'Maliha',
        errorMessage: 'Help article not found .'
    });
})

// Everything else is a match
app.get('*', (req, res) => {
    res.render('handleError', {
        title: '404',
        name: 'Maliha',
        errorMessage: 'Page not found.'
    });
})

// turn the server on 
app.listen(3000, () => {
    console.log('Server is Running');
})

