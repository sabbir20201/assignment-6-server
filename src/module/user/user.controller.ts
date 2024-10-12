import { Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";

const register = catchAsync(async(req:Request, res: Response)=>{
    const userData = req.body;
    const result = await UserServices.registerIntoDB(userData)
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'User create successfully',
        data: result
    })

})

const getAllUser = catchAsync(async(req:Request, res: Response)=>{
    const result = await UserServices.getAllUserFromDB()
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'All User retrieve successfully',
        data: result
    })
})


export const UserController = {
register,
getAllUser
}