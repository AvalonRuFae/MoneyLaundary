const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    username:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
    },
    password:{
        type : String,
        required : true,
    },
    items:{
        type : Array,
        required : false,
    },
    balance:{
        type : Array,
        required : false,
    },
}, {timestamps: false});

const UserInfo = mongoose.model('user_infos', userInfoSchema);
module.exports = UserInfo;