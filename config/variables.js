const dbHost = 'localhost'
const dbName = 'users_db'
const uriProd = `mongodb+srv://feliamunda:${process.env.MONGODB_PASSWORD_ATLAS}@cluster0.8xhim.mongodb.net/${ dbName }?retryWrites=true&w=majority`; 
const uriDev = `mongodb://${ dbHost }/${ dbName }`

let uriDB = '';

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
    dbHost
};