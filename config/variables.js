/* This file contains variables used by the API and can change depends on the context */

/**
 * @const dbHost            Database Host
 * @const dbName            Database Name
 * @const atlasUser         To Use a Mongo Atlas DB
 * @const atlasPassword     To Use a Mongo Atlas DB
 * @const port              Server PORT
 * @const secretTokenJWT    Secret Token JWT to encode tokens
 * @var   env               Actual Environment
 */
const dbHost = process.env.MONGO_HOST || 'localhost'  
const dbName = process.env.DB_NAME ||'users_db'
const atlasUser = process.env.MONGODB_USER_ATLAS || false
const atlasPassword = process.env.MONGODB_PASSWORD_ATLAS || false
const port = process.env.PORT || 3000;
const secretTokenJWT= process.env.SECRET_JWT || "secret"
const env = process.env.ENVIRONMENT || 'dev';
let dbUri = '';
if (env == 'dev')
    console.log('Ambiente de Desarrollo')

if (atlasUser && atlasPassword){
    dbUri = `mongodb+srv://${ atlasUser }:${ atlasPassword }@cluster0.8xhim.mongodb.net/${ dbName }?retryWrites=true&w=majority`; 
}else{
    dbUri = `mongodb://${ dbHost }/${ dbName }`
}
module.exports= {
    dbUri,
    dbName,
    dbHost,
    env,
    port,
    secretTokenJWT
};