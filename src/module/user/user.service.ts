"use client"
import { User } from "./user.model"
import { TUser } from "./user.interface";
import { USER_ROLE } from "./user.constant";
import { createToken, jwtPayloadType } from "../../utils/createToken";
import config from "../../config";
var jwt = require('jsonwebtoken');

const registerIntoDB = async (payload: TUser) => {
    console.log('payload', payload);

    const isUserExits = await User.findOne({ email: payload.email });
    if (isUserExits) {
        throw new Error('User already exits')
    }

    const jwtPayloadData = {
        email: payload.email,
        password: payload.password,
        userName: payload.userName,
        profileImage: payload.profileImage,
        role: USER_ROLE.ADMIN
    }
    const accessToken = createToken(jwtPayloadData, config.jwt_access_secret as string, config.jwt_access_expire_in as string)
    const refreshToken = jwt.sign(jwtPayloadData, config.jwt_refresh_secret, { expiresIn: config.jwt_refresh_expire_in })
    await User.create(jwtPayloadData)

    return {
        accessToken,
        refreshToken
    }

}
const adminRegisterIntoDB = async (payload: TUser) => {
    console.log('payload', payload);

    const isUserExits = await User.findOne({ email: payload.email });
    if (isUserExits) {
        throw new Error('User already exits')
    }

    const jwtPayloadData = {
        email: payload.email,
        password: payload.password,
        userName: payload.userName,
        profileImage: payload.profileImage,
        role: USER_ROLE.ADMIN
    }
    const accessToken = createToken(jwtPayloadData, config.jwt_access_secret as string, config.jwt_access_expire_in as string)
    const refreshToken = jwt.sign(jwtPayloadData, config.jwt_refresh_secret, { expiresIn: config.jwt_refresh_expire_in })
    await User.create(jwtPayloadData)

    return {
        accessToken,
        refreshToken
    }

}

const getAllUserFromDB = async () => {
    const result = await User.find()
    return result
}
const getSingleUserFromDB = async (userId: string) => {
    const result = await User.findOne({ _id: userId })
    return result
}


const followingInToDB = async (followingId: string, followersId: string) => {
    const updatedFollowerUser = await User.findByIdAndUpdate(
        followingId,
        { $addToSet: { followers: followersId } },
        { new: true }
    )

   const updatedFollowingUser= await User.findByIdAndUpdate(
        followersId,
        { $addToSet: { following: followingId } },
        { new: true }
    )
    return {
        updatedFollowingUser,
        updatedFollowerUser
    }
}
const unFollowingInToDB = async (followingId: string, followersId: string) => {
    const updatedUnFollowerUser = await User.findByIdAndUpdate(
        followingId,
        { $pull: { followers: followersId } },
        { new: true }
    )

 const updatedUnFollowingUser =   await User.findByIdAndUpdate(
        followersId,
        { $pull: { following: followingId } },
        { new: true }
    )
    return {
        updatedUnFollowerUser,
        updatedUnFollowingUser
    }
}
const deleteUserServicesById = async (id: string) => {
    try {
        const result = await User.deleteOne({_id: id})
        console.log('result from service', result);

        return result
    } catch (error) {
        console.log(error);
    }
}
export const UserServices = {
    registerIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    followingInToDB,
    unFollowingInToDB,
    adminRegisterIntoDB,
    deleteUserServicesById
}