import { create } from "domain";
import { User } from "./user.model"
import { TUser } from "./user.interface";
import { USER_ROLE } from "./user.constant";

const registerIntoDB = async (payload: TUser) => {
    console.log('payload', payload);


    const isUserExits = await User.findOne({ email: payload.email });
    if (isUserExits) {
        throw new Error('User already exits')
    }
    const userData = {
        email: payload.email,
        password: payload.password,
        userName: payload.userName,
        profileImage: payload.profileImage,
        role: USER_ROLE.USER
    }
    const result = await User.create(userData)
    return result
}
const getAllUserFromDB = async () => {
    const result = await User.find()
    return result
}

export const UserServices = {
    registerIntoDB,
    getAllUserFromDB
}