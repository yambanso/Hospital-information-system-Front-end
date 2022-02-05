import axios from "axios";


export const loginCall = async(userCredentials,dispatch)=> {
    dispatch({type: "LOGIN_START"});
    try{ 
        const res  = await axios.post("http://127.0.0.1:8000/api/sign_in",userCredentials);
        dispatch({type: "LOGIN_SUCCESS" , payload : res.data});
        //console.log(res.data)
    }catch(err){
        dispatch({type: "LOGIN_FAILURE" , payload : err});
    }
}