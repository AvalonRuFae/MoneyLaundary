const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
});

const expenseSchema = new Schema({
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
    incomes: [incomeSchema],
    expenses: [expenseSchema],
}, {timestamps: false});

userInfoSchema.methods.addIncomeOrExpense = function (name, type) {
    if (type == 'income'){
        this.incomes.push({name: name, amount: 0});
    } else if (type == 'expense'){
        this.expenses.push({name: name, amount: 0});
    } 
    return this;
}

userInfoSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.addIncomeOrExpense('Jobs', 'income');
    this.addIncomeOrExpense('Bank', 'income');
    this.addIncomeOrExpense('Entertainment', 'expense');
    this.addIncomeOrExpense('Transport', 'expense');
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