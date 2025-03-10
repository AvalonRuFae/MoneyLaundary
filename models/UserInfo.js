const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    username:{
        type : String,
        required : [true, 'Please enter an username'],
    },
    email:{
        type : String,
        required : true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password:{
        type : String,
        required: [true, 'Please enter a password'],
    },
    incomes:{
        type : Array,
        required : false,
    },
    expenses:{
        type : Array,
        required : false,
    },
}, {timestamps: false});

userInfoSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


const UserInfo = mongoose.model('user_infos', userInfoSchema);
module.exports = UserInfo;