const UserInfo = require('../models/UserInfo');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {type: '', name: '', value: ''};

    // wrong code
    if (err.message === 'Invalid type' | err.message === 'Income type does not exist' | err.message === 'Expense type does not exist'){
        errors.type = 'Wrong code in frontend ('+err.message+')';
    }

    // duplicate name error
    if (err.message === 'Income type already exists'){
        errors.name = 'Income type already exists';
    }
    if (err.message === 'Expense type already exists'){
        errors.name = 'Expense type already exists';
    }
}

const addItem_post = async (req, res) => {
    const user = res.locals.user;
    const {type, name} = req.body;
    try {
        await user.addIncomeOrExpense(type, name);
        res.status(201).json(user);
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const deleteItem_delete = async (req, res) => {
    const user = res.locals.user;
    const {type, name} = req.body;
    try {
        await user.deleteIncomeOrExpense(type, name);
        res.status(201).json(user);
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const addAmount_post = async (req, res) => {
    const user = res.locals.user;
    const {type, name, value} = req.body;
    try {
        await user.updateAmount(type, name, value);
        res.status(201).json(user);
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports = { 
    addItem_post, 
    deleteItem_delete, 
    addAmount_post 
};