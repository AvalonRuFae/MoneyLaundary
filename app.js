const express = require('express');
const morgan = require('morgan');   
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const UserInfo = require('./models/UserInfo');

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

    UserInfo.find({username: userInfo.username})
        .then((result) => {
            if(result.length > 0){
                res.status(401).json({message: 'Username already exists'});
            }else{
                UserInfo.find({email: userInfo.email})
                    .then((result) => {
                        if(result.length > 0){
                            res.status(401).json({message: 'Email already exists'});
                        }else{
                            userInfo.save()
                                .then((result) => {
                                    console.log(result);
                                    res.status(200).json({redirectUrl: '/login', message: 'User created successfully'});
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        }
                    })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Internal Server Error'});
        })
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    UserInfo.find({username: username, password: password})
        .then((result) => {
            if(result.length > 0){
                res.status(200).json({ redirectUrl: `/main/${result[0]._id}` });
            } else {
                UserInfo.find({email: username, password: password})
                    .then((result) => {
                        if (result.length > 0){
                            res.status(200).json({redirectUrl: `/main/${result[0]._id}`});
                        }else{
                            res.status(401).json({message: 'Username or password is incorect'});
                        }
                    })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Internal Server Error'});
        })
})

app.get('/main/:id', (req, res) => {
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
            res.status(404).redirect('/login');
        })
})

app.use((req, res) => {
    res.render('login');
})