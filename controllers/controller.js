const UserInfo = require('../models/UserInfo');
const jwt = require('jsonwebtoken');

const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'secret waiting for a good name', {
        expiresIn : maxAge
    });
}

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {userNameOrEmail: '', username: '', email: '', password: ''};

    //incorrect username or email
    if (err.message === 'Incorrect username or email'){
        errors.userNameOrEmail = 'User does not exist';
    }

    //incorrect password
    if (err.message === 'Incorrect password'){
        errors.password = 'Password is incorrect';
    }

    //duplicate username or email error
    if (err.code === 11000){
        if (err.keyPattern.username){
            errors.username = 'That username is already registered';
        }
        if (err.keyPattern.email){
            errors.email = 'That email is already registered';
        }
    }
    return errors;
}

const signup_get = (req, res) => {
    res.render('signup');
}

const login_get = (req, res) => {
    res.render('login');
}

const signup_post = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const user = await UserInfo.create({username, email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id});
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

const login_post = async (req, res) => {
    const {userNameOrEmail, password} = req.body;

    try {
        const user = await UserInfo.login(userNameOrEmail, userNameOrEmail, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

const main_get = (req, res) => {
    const id = req.params.id;
    UserInfo.findById(id)
        .then((result) => {
            console.log("User ID: ", result._id);
            console.log("User Name: ", result.username);
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
};

const logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
}

module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post,
    main_get, 
    logout_get
};