import { Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";

const register = catchAsync(async(req:Request, res: Response)=>{
    const userData = req.body;
    console.log('user register data');
    
    console.log(userData);
    
    const result = await UserServices.registerIntoDB(userData)
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'User create successfully',
        data: result
    })

})
const adminRegister = catchAsync(async(req:Request, res: Response)=>{
    const userData = req.body;
    const result = await UserServices.adminRegisterIntoDB(userData)
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
const getSingleUser = catchAsync(async(req:Request, res: Response)=>{
    const userId = req.params.id
    const result = await UserServices.getSingleUserFromDB(userId)
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'Single User retrieve successfully',
        data: result
    })
})
const follower = catchAsync(async(req:Request, res: Response)=>{
 
    const followingId = req.body.id // jake follow kora hobe tar id 
    const followersId = (req as any)?.user?._id;
    // console.log('follow', followingId, followersId);
    
    const result = await UserServices.followingInToDB(followingId, followersId)
    console.log('result from follow',result);
    
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'fOLLOWING SUCCESSFULLY',
        data: result
    })
})
const unFollower = catchAsync(async(req:Request, res: Response)=>{
 
    const followingId = req.body.id // jake follow kora hobe tar id 
    const followersId = (req as any)?.user?._id;
    console.log('un-follow', followingId, followersId);
    // 670b2cb2f04b1ac585a541fb   6720df573a5279cf66c3cc6c
    const result = await UserServices.unFollowingInToDB(followingId, followersId)
    console.log('result from un-follow',result);
    
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'user un-follow success',
        data: result
    })
})
const deleteUserControllerByAdmin = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    console.log('id from delete', id);
    
    const result = await UserServices.deleteUserServicesById(id)
    res.json({
        success: true,
        statusCode: 200,
        message: "User deleted successfully by admin",
        data: result
    })
})


export const UserController = {
register,
getAllUser,
getSingleUser,
adminRegister,
follower,
unFollower,
deleteUserControllerByAdmin
}