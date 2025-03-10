const jwt = require('jsonwebtoken');
const User = require('../models/UserInfo');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token, 'secret waiting for a good name', (err, decodedToken) => {    
            if (err){
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

const getUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, 'secret waiting for a good name', async (err, decodedToken) => {
            if (err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { requireAuth, getUser };