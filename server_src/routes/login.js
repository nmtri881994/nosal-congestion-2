const router = require('express').Router();
var jwt = require('jsonwebtoken');

const Account = require('../models/Account');
const Admin = require('../models/Admin');
const Client = require('../models/Client');

const config = require('../config/appConfigs');
const returnStatus = require('../properties/returnStatus');

function createClient(req, res, next) {
    const newClient = new Client({
        account: req.body
    });

    newClient.save()
        .then(client => {
            req.clientId = client._id;
            next();
        })
        .catch(error => {
            console.log(error);
            res.status(returnStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        })
};

router.post('/login', createClient, (req, res) => {
    const enteredAccount = new Account(req.body);
    // console.log(1, enteredAccount);
    Account.findOne({
        $and: [{ 'accountType': enteredAccount.accountType }, { 'accountId': enteredAccount.accountId }]
    })
        .then(account => {
            if (account && account != null) {
                account.name = enteredAccount.name;
                account.firstName = enteredAccount.firstName;
                account.lastName = enteredAccount.lastName;
                account.age = enteredAccount.age;
                account.avatar = enteredAccount.accountType === "facebook" ? `https://graph.facebook.com/${enteredAccount.accountId}/picture?type=large` : enteredAccount.avatar;
                account.email = enteredAccount.email;
                account.accessToken = enteredAccount.accessToken;
                account.save()
                    .then(updatedAccount => {
                        if (updatedAccount) {
                            const systemAccessToken = jwt.sign({
                                data: updatedAccount._id
                            }, config.secret, { expiresIn: config.expired_time });

                            const refreshToken = jwt.sign({
                                data: req.clientId
                            }, config.refreshTokenSecret, { expiresIn: config.refreshTokenExpireTime });
                            res.status(returnStatus.OK).json({
                                systemAccessToken,
                                refreshToken,
                                userInfo: {
                                    firstName: updatedAccount.firstName,
                                    avatar: updatedAccount.avatar
                                }
                            })
                        }
                    })
                    .catch(error => {
                        console.log('Internal error when updating account');
                        console.log(error);
                        res.status(returnStatus.INTERNAL_SERVER_ERROR).json({
                            error
                        })
                    })
            } else {
                Admin.findOne({
                    $and: [{ 'accountType': enteredAccount.accountType }, { 'accountID': enteredAccount.accountID }]
                })
                    .then(admin => {
                        if (admin && admin != null) {
                            enteredAccount.role = 'admin'
                        } else {
                            enteredAccount.role = 'user'
                        };

                        enteredAccount.avatar = enteredAccount.accountType === "facebook" ? `https://graph.facebook.com/${enteredAccount.accountId}/picture?type=large` : enteredAccount.avatar;
                        enteredAccount.save()
                            .then(createdAccount => {
                                if (createdAccount) {
                                    const systemAccessToken = jwt.sign({
                                        data: createdAccount._id
                                    }, config.secret, { expiresIn: config.expired_time });

                                    const refreshToken = jwt.sign({
                                        data: req.clientId
                                    }, config.refreshTokenSecret);

                                    res.status(returnStatus.OK).json({
                                        systemAccessToken,
                                        refreshToken,
                                        userInfo: {
                                            firstName: createdAccount.firstName,
                                            avatar: createdAccount.avatar
                                        }
                                    })
                                }
                            })
                            .catch(error => {
                                console.log('Internal error when saving new account');
                                console.log(error);
                                res.status(returnStatus.INTERNAL_SERVER_ERROR).json({
                                    error
                                })
                            })
                    })
                    .catch(error => {
                        console.log('Internal error when fiding admin list');
                        res.status(returnStatus.INTERNAL_SERVER_ERROR).json({
                            error
                        })
                    })
            }
        }).catch(error => {
            console.log('Internal error when fiding exising account');
            res.status(returnStatus.INTERNAL_SERVER_ERROR).json({
                error
            });
        })
});

router.post('/validate-token', (req, res) => {
    console.log('loginRoute', req.body.systemAccessToken);
    if (req.body.systemAccessToken) {
        jwt.verify(req.body.systemAccessToken, config.secret, function (error, decoded) {
            if (error) {
                res.status(returnStatus.INTERNAL_SERVER_ERROR).json({
                    error
                });
            } else {
                Account.findById(decoded.data)
                    .then(account => res.status(returnStatus.OK).json({}))
                    .catch(error => {
                        console.log(error);
                        res.status(returnStatus.INTERNAL_SERVER_ERROR).json({
                            error
                        })
                    });
            }
        })
    } else {
        res.status(returnStatus.BAD_REQUEST).json({});
    }
});

function verifyFreshToken(req, res, next) {
    if (req.body.refreshToken) {
        jwt.verify(req.body.refreshToken, config.refreshTokenSecret, function (error, decoded) {
            if (error) {
                res.status(returnStatus.UNAUTHORIZED).json({
                    error
                });
            } else {
                // console.log('loginRoute', decoded.data);
                Client.findById(decoded.data)
                    .then(client => {
                        req.client = client;
                        next();
                    })
                    .catch(error => {
                        res.status(returnStatus.INTERNAL_SERVER_ERROR).json({
                            error
                        });
                    })
            }
        })
    } else {
        res.status(returnStatus.BAD_REQUEST).json({});
    }

};

router.post('/get-new-token', verifyFreshToken, (req, res) => {
    Account.findOne({
        $and: [{ 'accountType': req.client.account.accountType }, { 'accountId': req.client.account.accountId }]
    })
        .then(account => {
            const systemAccessToken = jwt.sign({
                data: account._id
            }, config.secret, { expiresIn: config.expired_time });

            const refreshToken = jwt.sign({
                data: req.client._id
            }, config.refreshTokenSecret, { expiresIn: config.refreshTokenExpireTime });

            res.status(201).json({
                systemAccessToken,
                refreshToken
            })
        })
        .catch(error => {
            console.log(error);

            res.status(returnStatus.INTERNAL_SERVER_ERROR).json({ error });
        })
});

router.post('/logout', (req, res) => {
    if (req.body.refreshToken) {
        jwt.verify(req.body.refreshToken, config.refreshTokenSecret, function (error, decoded) {
            if (error) {
                res.status(returnStatus.INTERNAL_SERVER_ERROR).json({
                    error
                });
            } else {
                console.log(111, decoded.data);
                Client.findOneAndDelete({ _id: decoded.data })
                    .then(() => {
                        res.status(returnStatus.OK).json({});
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(returnStatus.INTERNAL_SERVER_ERROR).json({
                            error
                        });
                    })
            }
        })
    } else {
        res.status(returnStatus.BAD_REQUEST).json({
            error
        });
    }
})

router.get('/test', (req, res) => {
    const token = req.headers.authorization;
    // console.log(11111111111111, token);
    if (token) {
        // console.log(1);
        jwt.verify(token, config.secret, function (error, decoded) {
            if (error) {
                res.status(returnStatus.UNAUTHORIZED).json({
                    error
                })
            } else {
                Account.findById(decoded.data)
                    .then(account => res.status(returnStatus.OK).json({}))
                    .catch(error => {
                        console.log(error);
                        res.status(returnStatus.INTERNAL_SERVER_ERROR).json({
                            error
                        })
                    });

            }
        })
    } else {
        res.status(returnStatus.BAD_REQUEST).json({});
    }
});

module.exports = router;