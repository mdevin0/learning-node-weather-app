const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const ROOT_FOLDER = path.join(__dirname, '..');
const PUBLIC_FOLDER = path.join(ROOT_FOLDER, 'public');
const VIEWS_FOLDER = path.join(ROOT_FOLDER, 'templates', 'views');
const PARTIALS_FOLDER = path.join(ROOT_FOLDER, 'templates', 'partials');
const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'hbs');
app.set('views', VIEWS_FOLDER);
hbs.registerPartials(PARTIALS_FOLDER);

app.use(express.static(PUBLIC_FOLDER));

const creator = "someone you probably don't know";

app.get('', (req, res) => {
    res.render('index', {
        tab_title: "WeatherApp",
        page_title: "Weather",
        creator: creator
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        tab_title: "Help",
        page_title: "Help",
        creator: creator
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        tab_title: "About",
        page_title: "About",
        creator: creator
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "'address' is a required property"
        });
    }

    geocode(req.query.address, (error, resGeo) => {
        if(error){
            return res.send({error});
        }

        forecast(resGeo.latitude, resGeo.longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location: res.location,
                address: req.query.address
            });
        });
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        tab_title: "Not Found",
        page_title: "Help Not Found",
        creator: creator,
        not_found_message: "Can't help you with that."
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        tab_title: "WeatherApp",
        page_title: "Weather",
        creator: creator,
        not_found_message: 'What are you looking for? @.@'
    });
});

// Starting the server
app.listen(PORT, () => {
    console.log('Flexing unexisting muscles...')
});