/* ¿Qué es el notFound?:
Es un manejador de middleware que se ejecuta cuando ninguna ruta coincide con la URL solicitada (req.originalUrl). 
Su propósito es enviar una respuesta de error 404 (Not Found) al cliente indicando que el recurso solicitado no está disponible.*/
const notFound = (req, res, next) =>{
    const error = new Error(`No se encontro : ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/*¿Qué es el errorHandler?:Es un manejador de middleware que se ejecuta cuando se produce un error en cualquier parte de la aplicación. 
Su función es capturar el error, establecer el código de estado de la respuesta según sea necesario (por ejemplo, 500 Internal Server 
Error si el estado de la respuesta no es 200), y enviar una respuesta al cliente con detalles sobre el error (como el mensaje de error 
y la pila de llamadas)*/
const errorHandler=(err,req,res,next)=>{
    const statuscode=res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode); 
    res.json(
        {
            message: err?.message,
            stack: err?.stack,
        }
    );
};
module.exports={errorHandler, notFound};