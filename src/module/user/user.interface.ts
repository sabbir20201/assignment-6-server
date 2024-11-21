import { USER_ROLE, USER_STATUS } from "./user.constant";

export type TUser = {
    email: string;
    password: string;
    userName: string;
    profileImage?: string;
    role?: keyof typeof USER_ROLE;
    status?:keyof typeof USER_STATUS;
    followers?: string[];
    following?: string[];

}
export type TLogin = {
    email: string;
    password: string;


}