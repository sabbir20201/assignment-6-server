import e, { NextFunction, Request, Response } from "express";
import { TErrorSource } from "../utils/errorType";
import { ZodError } from "zod";
import { handleZodError } from "../errors/handleZodError";
import { handleValidationError } from "../errors/handleValidationError";
import { handleCastError } from "../errors/handleCastError";
import { handledDuplicateError } from "../errors/handledDuplicateError";
import AppError from "../errors/AppError";




export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): any => {

    let statusCode = 500;
    let message = err.message || 'something went wrong';    

    let errorSource: TErrorSource = [
        {
            path: '',
            message: 'something went wrong'
        }
    ]
    
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }else if(err?.name === 'ValidationError'){
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
        
    }else if(err?.name === 'CastError'){
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }else if(err?.name === 11000){
        const simplifiedError = handledDuplicateError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }else if(err instanceof AppError){
        statusCode = err.statusCode;
        message= err.message
    }


    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSource,


    })

}

export const GlobalErrorHandler = {
    globalErrorHandler
}