import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcryptjs from 'bcryptjs';
// import bcrypt from 'bcryptjs';
import { USER_ROLE } from "./user.constant";

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
        enum: Object.values(USER_ROLE)
    }

})
UserModelSchema.pre("save", async function (next) {
    const user = this;
    console.log('this',this);
    user.password = await bcryptjs.hash(user.password, Number(config.salt_round))
    next();
})

export const User  = model<TUser>('User', UserModelSchema)