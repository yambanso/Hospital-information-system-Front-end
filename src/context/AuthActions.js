{/** this action is called whenever the  */}
export const LoginStart = (userCredentials)=> ({
    type : "LOGIN_START"
});
{/** this action is called when user authentication is done */}
export const LoginSuccess = (user)=> ({
    type : "LOGIN_SUCCESS",
    payload : user,
});
{/** this action is called when user authentication has failled */}
export const LoginFailure = (error)=> ({
    type : "LOGIN_FAILURE",
    payload : error,

});