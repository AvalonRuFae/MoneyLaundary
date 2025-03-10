const express = require('express');
const morgan = require('morgan');   
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const UserInfo = require('./models/UserInfo');
const {requireAuth, getUser} = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');

const app = express();

const dbURI = "mongodb+srv://tester:test1234@nodetuts.9c7sz.mongodb.net/MoneyLaundary?retryWrites=true&w=majority&appName=nodetuts";

mongoose.connect(dbURI) 
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());


app.use((req, res, next) => {  
    res.locals.path = req.path;
    next();
});

//routes and controllers
app.get('*', getUser);
app.get('/main', requireAuth, (req, res) => {res.render('main');});
app.use(routes);
app.use((req, res) => {res.render('login');});