import { USER_ROLE } from "./user.constant";

export type TUser = {
    email: string;
    password: string;
    userName: string;
    profileImage: string;
    role: keyof typeof USER_ROLE;

}
export type TLogin = {
    email: string;
    password: string;


}