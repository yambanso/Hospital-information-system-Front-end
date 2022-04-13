import { createContext, useReducer} from 'react'
import AuthReducer from './AuthReducer';

/**
 * @constant INITIAL_STATE
 * @description defining the initial state for our context objext 
 **/
const INITIAL_STATE = {
    user : null,
    isFetching : false,
    error : false,
};
/**
 * @exports AuthContext
 * @description passing initial state to our authcontext object 
 * 
*/
export const AuthContext = createContext(INITIAL_STATE);
/**
 * @exports AuthContextProvider
 * @description exporting the authcontect provider with children props 
 **/
export const AuthContextProvider = ({children}) => {
    const [state , dispatch] = useReducer(AuthReducer,INITIAL_STATE)

    return (
        /** @description returning the auth contect object with current state and children props */
        <AuthContext.Provider value={
            {user: state.user, 
            isFetching: state.isFetching,
            error: state.error, 
            dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}