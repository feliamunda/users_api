/* This file contains variables used by the API and can change depends on the context */

const dbHost = process.env.HOST || 'localhost'
const dbName = process.env.DB_NAME ||'users_db'
const uriProd = `mongodb+srv://feliamunda:${process.env.MONGODB_PASSWORD_ATLAS}@cluster0.8xhim.mongodb.net/${ dbName }?retryWrites=true&w=majority`; 
const uriDev = `mongodb://${ dbHost }/${ dbName }`
const port = process.env.PORT || 3000;
const secretTokenJWT= process.env.SECRET_JWT || "secret"

let uriDB = '';
let env = process.env.ENVIRONMENT || 'dev';

if (process.env.ENVIRONMENT == 'prod'){
    console.log('Ambiente de Producción')
    uriDB = uriProd
}   
else{
    console.log('Ambiente de Desarrollo')
    uriDB = uriDev
}

module.exports= {
    uriDB,
    dbName,
    dbHost,
    env,
    port,
    secretTokenJWT
};