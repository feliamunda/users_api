/* This Middleware authenticate user by JWT token generated in the /auth route */
//Dependencies
const jwt = require('jsonwebtoken');
const user = require('../models/user')
//Modules
const variables = require('../config/variables')

const auth = (req, res, next) => {                                          //Middleware to authenticate users by token
    if (res.locals.exceptionRoutes.includes(req._parsedUrl.pathname)){
        next() ;
    }else{
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];                         //Extract the Token Key from the header without 'Bearer'
            jwt.verify(token, variables.secretTokenJWT, (err, user) => {    //Verify Token Extracted
                if (err) {
                    return res.sendStatus(403);                             //Status 403 Forbidden
                }
                req.user = user;                                            //Set the user who access in the request object as a property 
                next();
            });
        } else {
            res.sendStatus(401);                                             //Status 403 Forbidden
        }
    }
};
// const isAuthorized  = function(req, res, next) {

//     User.findById(req.session.userId).exec(function (error, user) {
//         if (error) {
//             return next(error);
//         } else {      
//             if (user === null) {     
//                 var err = new Error('Not authorized! Go back!');
//                 err.status = 400;
//                 return next(err);
//             } else {
//                 return next();
//             }
//         }
//     });
// }
module.exports = auth