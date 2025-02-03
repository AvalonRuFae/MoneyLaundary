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

app.use(routes);

app.post('/addIncome', (req, res) => {
    const id = req.body.userId;
    const newIncome = req.body.newIncome;

    UserInfo.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the newIncome already exists in the incomes array
            if (user.incomes.includes(newIncome)) {
                return res.status(400).json({ message: 'Income type already exists' });
            }

            // Add the newIncome to the incomes array
            UserInfo.findByIdAndUpdate(
                id,
                { $push: { incomes: newIncome , income_values: 0} },
                { new: true, useFindAndModify: false }
            )
            .then((result) => {
                res.status(200).json({ message: 'success', user: result });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
})

app.post('/addExpense', (req, res) => {
    const id = req.body.userId;
    const newExpense = req.body.newExpense;

    UserInfo.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the newIncome already exists in the incomes array
            if (user.expenses.includes(newExpense)) {
                return res.status(400).json({ message: 'Expense type already exists' });
            }

            // Add the newIncome to the incomes array
            UserInfo.findByIdAndUpdate(
                id,
                { $push: { expenses: newExpense , expense_values: 0} },
                { new: true, useFindAndModify: false }
            )
            .then((result) => {
                res.status(200).json({ message: 'success', user: result });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
})

app.use((req, res) => {
    res.render('login');
})