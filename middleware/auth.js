const jwt = require('jsonwebtoken');
const config = require('../configs.json');

//AUTHENTIKASI
const auth = async (req, res, next) => {

    try {
        let token = req.headers['authorization'];
        if (!token) return res.status(401).send({
            auth: false,
            message: 'No token provided.'
        });

        jwt.verify(token, config.secret, async function (err, decoded) {
            if (err) return res.status(401).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
            // console.log(decoded.data.is_verified);
            if (decoded.data.is_verified == '3') {
                req.user = decoded;
                next();
            } else {
                res.status(200).send({
                    status: res.statusCode,
                    message: "account not verified",
                })
            }
        });
    } catch (error) {
        res.status(401).send({
            status: res.statusCode,
            message: "has no authority",
        })
    }
};

module.exports = auth;