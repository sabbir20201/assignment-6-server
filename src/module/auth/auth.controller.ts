import { Request, Response } from "express"
import httpStatus from "http-status";
import { AuthServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";

const login = catchAsync(async (req: Request, res: Response) => {
    const loginData = req.body;
    const result = await AuthServices.userLoginFromDB(loginData)
    console.log(result);
    
    const {refreshToken } = result
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    })

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'User login successfully',
        data: result
    })
})
export const AuthController = {
    login
}