
var jwt = require('jsonwebtoken');

// export interface jwtPayload {
//     email: string;
//     role: 'ADMIN' | 'USER'
// }

export interface jwtPayloadType {
    email: string;
    // id: string;
    userName: string;
    role: string | undefined; 
    // password:string,
    // profileImage:string;

}
export const createToken = (payload:jwtPayloadType , secret: string, expireTime: string)=>{
    return jwt.sign(payload, secret, {
        expiresIn: expireTime
    })
}