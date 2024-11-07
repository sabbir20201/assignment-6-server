import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLogin, TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { isPasswordMatched } from "../../utils/isPasswordMatched";
import { createToken, jwtPayload } from "../../utils/createToken";
import config from "../../config";
import bcrypt from "bcryptjs"
import { sendEmail } from "../../utils/sendEmail";

var jwt = require('jsonwebtoken');

const userLoginFromDB = async (payload: TLogin, ) => {

    const exitsUser = await User.findOne({ email: payload.email });
    if (!exitsUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not exits')
    }
    const passwordMatch = await isPasswordMatched(
        payload.password,
        exitsUser.password
    )
    // console.log('Attempting to login:', payload);
    // console.log('Found user:', exitsUser);

    if (!passwordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Password dose not matched')
    }
    const userId = exitsUser._id.toString();
    console.log(exitsUser);
    
    const jwtPayload = {
        _id: userId,
        email: exitsUser.email,
        role: exitsUser.role,
        userName: exitsUser.userName,
        profileImage: exitsUser.profileImage,
        followers: exitsUser?.followers,
        following: exitsUser?.following,
    }
    console.log('from jwt payload',jwtPayload);
    
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expire_in as string)
    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret, { expiresIn: config.jwt_refresh_expire_in })

    return {
        accessToken,
        refreshToken
    }
}

const changedPasswordFromDB = async (userData: jwtPayload, payload: {oldPassword: string, newPassword: string}) => {
//    userData = it will come from req.user 
    // console.log("use data =>",userData );
    
    const user = await User.findOne({email: userData?.email});
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'this is user is not found');
    }

    const matchedPassword = await isPasswordMatched(payload?.oldPassword, user?.password)
    if(!matchedPassword){
        throw new AppError(httpStatus.FORBIDDEN, 'password dose not matched');
    }

    // hashNew password 
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.salt_round)
    )
    await User.findByIdAndUpdate(
        // {
        //     email: userData.email,
        //     role: userData.role,
        // },
        user._id,
        {
            password: newHashedPassword,
            passwordChangedAt: new Date(),
        }
        ,
        {new: true}
    );
    return null
};

// const refreshToken = async (token: string) => {
//     const decoded = jwt.verify(
//         token,
//         config.jwt_refresh_secret
//     )
//     const { email, int } = decoded;
//     // check if the user is exist 
//     const user = await User.findOne({email: email});
//     if (!user) {
//         throw new AppError(httpStatus.NOT_FOUND, 'this user is not found')
//     }
//     // check the user is blocked 
//     // if (userStatus === 'BLOCKED') {
//     //     throw new AppError(httpStatus.FORBIDDEN, 'this user is blocked');
//     // }
//     if (user.passwordChangedAt && User.isJWTIssueBeforePasswordChange(user.passwordChangedAt)) {
//         throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized')
//     }
//     const jwtPayload = {
//         _id: user._id,
//         // name: user.name,
//         email: user.email,
//         // mobileNumber: user.mobileNumber,
//         role: user.role,
//         // status: user.status,
//     };
//     const accessToken = createToken(
//         jwtPayload,
//         config.jwt_access_secret as string,
//         config.jwt_access_expire_in as string,
//     );
//     return {
//         accessToken,
//     };
// }


const updateUserInformationFromDB = async (id: string,payload:TUser) => {
    try {
        console.log('from user updated service id',id);
        const updateComment = await User.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true
        })
        return updateComment
    } catch (error) {
        console.log(error);
    }
}
const forgetPasswordFromDB = async(id: string)=>{
    const exitsUser = await User.findOne({ email: payload.email });
    if (!exitsUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not exits')
    }

    const userId = exitsUser._id.toString();
    const jwtPayload = {
        _id: userId,
        email: exitsUser.email,
        role: exitsUser.role,
    }
    console.log('from jwt payload',jwtPayload);
    
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expire_in as string)

    const resetUiLink = `http://localhost:3000?id=${id}token=${accessToken}`
    sendEmail()

}
export const AuthServices = {
    userLoginFromDB,
    changedPasswordFromDB,
    updateUserInformationFromDB,
    forgetPasswordFromDB
}