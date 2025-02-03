const UserInfo = require('../models/UserInfo');

const signup_post = (req, res) => {
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
                                    UserInfo.findByIdAndUpdate(
                                            userInfo._id,
                                            { $push: {
                                                incomes: { $each: ['Jobs', 'Bank'] },
                                                income_values: { $each: [0, 0] },
                                                expenses: { $each: ['Entertainment', 'Transport'] },
                                                expense_values: { $each: [0, 0] }
                                            }},
                                            {new: true, useFindAndModify: false}
                                    )
                                    .then((result) => {
                                        console.log(result);
                                        res.status(200).json({redirectUrl: '/login', message: 'User created successfully'});
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        res.status(500).json({message: 'Internal Server Error'});
                                    });
                                })
                                .catch((err) => {
                                    console.log(err);
                                    res.status(500).json({message: 'Internal Server Error'});
                                });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({message: 'Internal Server Error'});
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Internal Server Error'});
        });
};

const login_post = (req, res) => {
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

module.exports = {
    signup_post,
    login_post,
    main_get
};