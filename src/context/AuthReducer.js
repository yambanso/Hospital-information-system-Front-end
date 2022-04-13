/** defining a series of action taken when the user is being authenticated using a switch */
const AuthReducer = (state, action) =>{
    switch(action.type){
            case "LOGIN_START":
                return{
                    user:null,
                    isFetching:true,
                    error : false,
                };
            case "LOGIN_SUCCESS":
                return{
                    user:action.payload,
                    isFetching:false,
                    error : false,
                };  
                case "LOGIN_FAILURE":
                    return{
                        user:null,
                        isFetching:false,
                        error : action.payload,
                    };    
                      
            default :
                return state    
    }
};
export default AuthReducer;