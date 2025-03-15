const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const income = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
});

const expense = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
});

const userInfoSchema = new Schema({
    username:{
        unique: true,
        type : String,
        required : [true, 'Please enter an username'],
    },
    email:{
        type : String,
        required : true,
        unique: true,
        lowercase: true,
        //validate: [isEmail, 'Please enter a valid email'],
    },
    password:{
        type : String,
        required: [true, 'Please enter a password'],
    },
    incomes: [income],
    expenses: [expense],
}, {timestamps: false});

userInfoSchema.methods.addIncomeOrExpense = function (type, name) {
    name = name.toLowerCase();
    if (type == 'income'){
        try {
            this.incomes.forEach(income => {
                if (income.name == name){
                    throw Error('Income type already exists');
                }
            });
            this.incomes.push({name: name, amount: 0});
        } catch (err) {
            return err;
        }
    } else if (type == 'expense'){
        try {
            this.expenses.forEach(expense => {
                if (expense.name == name){
                    throw Error('Expense type already exists');
                }
            });
            this.expenses.push({name: name, amount: 0});
        } catch (err) {
            return err;
        }
    } 
    return new Error('Invalid type');
}

userInfoSchema.methods.deleteIncomeOrExpense = function (type, name) {
    name = name.toLowerCase();
    if (type == 'income'){
        try {
            this.incomes.forEach(income => {
                if (income.name == name){
                    this.incomes.pull(income);
                    return this;
                }
            });
            throw Error('Income type does not exist');
        } catch (err) {
            return err;
        }
    }
    else if (type == 'expense'){
        try {
            this.expenses.forEach(expense => {
                if (expense.name == name){
                    this.expenses.pull(expense);
                    return this;
                }
            });
            throw Error('Expense type does not exist');
        } catch (err) {
            return err;
        }
    }
    return new Error('Invalid type');
}

userInfoSchema.methods.updateAmout = function (type, name, amount) {
    name = name.toLowerCase();
    if (type == 'income'){
        try {
            this.incomes.forEach(income => {
                if (income.name == name){
                    income.amount += amount;
                    return this;
                }
            });
            throw Error('Income type does not exist');
        } catch (err) {
            return err;
        }
    }
    else if (type == 'expense'){
        try {
            this.expenses.forEach(expense => {
                if (expense.name == name){
                    expense.amount += amount;
                    return this;
                }
            });
            throw Error('Expense type does not exist');
        } catch (err) {
            return err;
        }
    }
    return new Error('Invalid type');
}

userInfoSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.addIncomeOrExpense('income', 'income');
    this.addIncomeOrExpense('income', 'Bank');
    this.addIncomeOrExpense('expense', 'Entertainment');
    this.addIncomeOrExpense('expense', 'Transport');
    next();
})

userInfoSchema.statics.login = async function(username, email, password){
    let user = await this.findOne({username});
    if (user){
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user;
        }
        throw Error('Incorrect password');
    }
    user = await this.findOne({email});
    if (user){
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect username or email');
}


const UserInfo = mongoose.model('user_infos', userInfoSchema);
module.exports = UserInfo;