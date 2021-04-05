/* This Middleware set exceptions to the auth middleware this need to be aplied before auth middleware */


/**
 * @function noAuth              Middleware to set routes where the middleware is applied to pass through
 *      @param {Request} req     Request Object
 *      @param {Response} res    Response Object
 *      @param {Function} next   next Middleware
 */
const noAuth = (req, res, next) => {                     
    const routes = ['/api/exist/','/auth']
    res.locals.exceptionRoutes = routes;
    next()
};

module.exports = noAuth