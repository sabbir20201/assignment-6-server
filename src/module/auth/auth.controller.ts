import { Request, Response } from "express"
import httpStatus from "http-status";
import { AuthServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";

const login = catchAsync(async (req: Request, res: Response) => {
    const loginData = req.body;
    const result = await AuthServices.userLoginFromDB(loginData)
    // console.log(result);

    const { refreshToken } = result
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

const changedPassword = async (req: Request, res: Response) => {
    try {

        const passwordData = req?.body;
        const userData = req.user;
        const result = await AuthServices.changedPasswordFromDB(userData, passwordData)

        res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'password Updated successfully',
            data: result,
        })
    } catch (error) {
        console.log('this is error', error);
    }

}


const updateUserInformation = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body;
    const userId = req?.user;

    console.log('user data from user update info', userId, userData);

    const result = await AuthServices.updateUserInformationFromDB(userId, userData)

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'User updated successfully',
        data: result
    })
})

const forgetPassword = async (req: Request, res: Response) => {
    const id = req.body;
    
    const result = await AuthServices.forgetPasswordFromDB(id);
    
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'Reset Link generated successfully',
        data: result
    })
}

export const AuthController = {
    login,
    changedPassword,
    updateUserInformation,
    forgetPassword
}