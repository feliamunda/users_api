/* This Middleware runs just in Developer environment to get info about the request */

module.exports = (req, res, next) => {
    console.log('Request Type:',req.method);
    next();
}