import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorResponse } from "../utils/errorType";
// import { TErrorSource, TGenericErrorResponse } from "../utils/errorType";

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const statusCode = 400;
    const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue?.message
        }
    })
  
    return {
        statusCode,
        message: "Validation Error",
        errorSource,
    }
}