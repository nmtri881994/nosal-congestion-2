const jwt = require('jsonwebtoken');
const config = require('../../config/appConfigs');

const Account = require('../../models/Account');
const returnStatus = require('../../properties/returnStatus');

const authorize = (req, res, next) => {
    if (req.method !== "OPTIONS") {
        const token = req.headers.authorization;
        if (token) {
            jwt.verify(token, config.secret, function (error, decoded) {
                if (error) {
                    res.status(returnStatus.UNAUTHORIZED).json({
                        error
                    })
                } else {
                    Account.findById(decoded.data)
                        .then(account => {
                            req.userId = decoded.data;
                            next();
                        })
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
    } else {
        next();
    }
};

module.exports = authorize;