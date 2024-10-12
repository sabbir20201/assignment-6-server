import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLogin } from "../user/user.interface";
import { User } from "../user/user.model";
import { isPasswordMatched } from "../../utils/isPasswordMatched";
import { createToken } from "../../utils/createToken";
import config from "../../config";
var jwt = require('jsonwebtoken');

const userLoginFromDB = async (payload: TLogin) => {

    const exitsUser = await User.findOne({ email: payload.email });
    if (!exitsUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not exits')
    }
    const passwordMatch = await isPasswordMatched(
        payload.password,
        exitsUser.password
    )
    console.log('Attempting to login:', payload);
    console.log('Found user:', exitsUser);

    if (!passwordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST,'Password dose not matched')
    }
    const jwtPayload = {
        email: exitsUser.email,
        role: exitsUser.role
    }
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expire_in as string)
    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret, { expiresIn: config.jwt_refresh_expire_in })

    return {
        accessToken,
        refreshToken
    }

}

export const AuthServices = {
    userLoginFromDB
}