const express = require('express');
const morgan = require('morgan');   
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const UserInfo = require('./models/UserInfo');

const app = express();

const dbURI = "mongodb+srv://tester:test1234@nodetuts.9c7sz.mongodb.net/MoneyLaundary?retryWrites=true&w=majority&appName=nodetuts";

mongoose.connect(dbURI  , { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
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

app.post('/signup', (req, res) => {
    const userInfo = new UserInfo(req.body);
    userInfo.save()
        .then((result) => {
            console.log(result);
            res.redirect('/login');
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    UserInfo.find({username: username, password: password})
        .then((result) => {
            if(result.length > 0){
                res.status(200).json({ redirectUrl: `/${result[0]._id}/main` });
            } else {
                res.status(401).json({message: 'Username or password is incorrect'});
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Internal Server Error'});
        })
})

app.get('/:id/main', (req, res) => {
    const id = req.params.id;
    UserInfo.findById(id)
        .then((result) => {
            console.log(result);
            if(result){
                res.render('main', {user: result});
            }else{
                res.redirect('/login');
            }
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/login');
        })
})

