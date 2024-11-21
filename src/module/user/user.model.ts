import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcryptjs from 'bcryptjs';
// import bcrypt from 'bcryptjs';
import { USER_ROLE, USER_STATUS } from "./user.constant";

const UserModelSchema = new Schema<TUser>({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
    },
    status: {
        type: String,
        enum: Object.values(USER_ROLE),
        default: USER_STATUS.ACTIVE,
        required: false
    },
    followers:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                default: false
            }

        ],
    following:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                default: false
            }

        ],
})
UserModelSchema.pre("save", async function (next) {
    const user = this;
    console.log('this', this);
    user.password = await bcryptjs.hash(user.password, Number(config.salt_round))
    next();
})
// UserModelSchema.static.isJwtIssuedBeforePasswordChanged = function(
//     passwordChangedTimeStamp: number,
//     jwtIssuedTimeStamp: number
// ){
//     const passwordChangedTime = new Date(passwordChangedTimeStamp).getTime() / 1000;
//     return passwordChangedTime > jwtIssuedTimeStamp;
// }

export const User = model<TUser>('User', UserModelSchema)