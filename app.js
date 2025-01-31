const express = require('express');
const morgan = require('morgan');   
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

//const dbURL = "mongodb+srv://tester:tester1234@nodetuts.9c7sz.mongodb.net/MoneyLaundary?retryWrites=true&w=majority&appName=nodetuts";

//mongoose.connect(dbURL  , { useNewUrlParser: true, useUnifiedTopology: true }) 
//    .then((result) => app.listen(3000))
//    .catch((err) => console.log(err));

app.listen(3000);

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use((req, res, next) => {  
    res.locals.path = req.path;
    next();
});

//routes and controllers
app.get('/', (req, res) => {
    res.redirect('/login');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/signup', (req, res) => {
    res.render('signup');
})