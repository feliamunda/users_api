
/**
 *  @constant errorTypes     a object which contains other objects with a key of a code key each of them has a error code and a message
 */
const errorTypes = {
    'default':{msg: 'Ocurrio un error',code: 'default'},
    'notFound':{msg: 'No se encontro ningun registro que cumpla con su requerimiento',code: 'notFound'},
    'noMatch':{msg: 'No coinciden los valores',code: 'noMatch'},
    'notUnique':{msg: 'Ya existe',code: 'notUnique'},
    'reqValues':{msg: 'No se recibieron los paramétros requeridos',code: 'reqValues'}
}

module.exports = {
    errorTypes
}