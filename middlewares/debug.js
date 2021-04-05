/* This Middleware runs just in Developer environment to get info about the request */


/**
 * @function debug               Middleware to show info in console log
 *      @param {Request} req     Request Object
 *      @param {Response} res    Response Object
 *      @param {Function} next   next Middleware
 */
const debug = (req, res, next) => {
    console.log('Request Type:',req.method);
    next();
}
module.exports = debug;