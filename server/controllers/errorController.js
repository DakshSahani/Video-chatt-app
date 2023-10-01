const appError = require("../utils/appError");

const handleJWTError = ()=>new appError('Invalid Token! Please log in again',401)

const handleJWTExpire = ()=>new appError('Your Token has Expired! Please log in again',401)

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';
    let error;

    if(process.env.NODE_ENV == 'development'){
        res.status(err.statusCode).send({
            status:err.status,
            err:err,
            message:err.message,
            stack:err.stack
        })
    }
    else{
        if(err.isOperational)
            error = {...err};

        //FIXME:
        else if(err.name == "CastError")
            error = new appError(`Invalid ${err.path} : ${err.value}`,400)
        else if(err.name == 'JsonWebTokenError')
            error = handleJWTError()
        else if(err.name == 'TokenExpiredError')
            error = handleJWTExpire()
        else{
            error = new appError('something Went Wrong',500)
        }
        
        res.status(error.statusCode).send({
            status:error.status,
            message:error.message,
            err:error,
            stack:error.stack
        })
    }
}