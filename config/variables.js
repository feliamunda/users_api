/* This file contains variables used by the API and can change depends on the context */

/**
 * @const dbHost            Database Host
 * @const dbName            Database Name
 * @const uriProd           Production Database uri
 * @const uriDev            Development Database uri
 * @const port              Server PORT
 * @const secretTokenJWT    Secret Token JWT to encode tokens
 * @var   env               Actual Environment
 */
const dbHost = process.env.HOST || 'localhost'  
const dbName = process.env.DB_NAME ||'users_db'
const dbUriProd = `mongodb+srv://${process.env.MONGODB_USER_ATLAS}:${process.env.MONGODB_PASSWORD_ATLAS}@cluster0.8xhim.mongodb.net/${ dbName }?retryWrites=true&w=majority`; 
const dbUriDev = `mongodb://${ dbHost }/${ dbName }`
const port = process.env.PORT || 3000;
const secretTokenJWT= process.env.SECRET_JWT || "secret"
const env = process.env.ENVIRONMENT || 'dev';

let dbUri = '';

if (env == 'prod'){
    console.log('Ambiente de Producción')
    dbUri = dbUriProd
}   
else{
    console.log('Ambiente de Desarrollo')
    dbUri = dbUriDev
}
module.exports= {
    dbUri,
    dbName,
    dbHost,
    env,
    port,
    secretTokenJWT
};