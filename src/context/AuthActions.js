/**
 * @exports LoginStart
 * @description this action is called whenever the
 **/
export const LoginStart = (userCredentials)=> ({
    type : "LOGIN_START"
});
/**
 * @exportsL LoginSuccess
 * @description this action is called when user authentication is done 
 * 
*/
export const LoginSuccess = (user)=> ({
    type : "LOGIN_SUCCESS",
    payload : user,
});
/**
 * @exports LoginFailure
 * @description this action is called when user authentication has failled 
*/
export const LoginFailure = (error)=> ({
    type : "LOGIN_FAILURE",
    payload : error,

});