/* This Middleware set exceptions to the auth middleware this need to be aplied before auth middleware */

const noAuth = (req, res, next) => {                      //Middleware to set routes where the middleware is applied to pass through
    const routes = ['/api/exist/','/auth']
    res.locals.exceptionRoutes = routes;
    next()
};

module.exports = noAuth