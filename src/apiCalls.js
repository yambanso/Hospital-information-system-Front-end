import axios from "axios";

export const api_URL = "http://127.0.0.1:8000/api"
export const loginCall = async(userCredentials,dispatch)=> {
    dispatch({type: "LOGIN_START"});
    try{ 
        const res  = await axios.post(api_URL+"/sign_in",userCredentials);
        dispatch({type: "LOGIN_SUCCESS" , payload : res.data});
        //console.log(res.data)
    }catch(err){
        dispatch({type: "LOGIN_FAILURE" , payload : err});
    }
}

export const getUserCount = axios.create({
    baseURL : api_URL+"/user_count"
}) 

export const getPatientCount = axios.create({
    baseURL : api_URL+"/patient_count"
})

export const getPatients = axios.create({
    baseURL :  api_URL+"/patients"
})

export const getUsers = axios.create({
    baseURL : api_URL+"/users"
})

export const getMedicine = axios.create({
    baseURL : api_URL+'/Medication'
})

export const getServices = axios.create({
    baseURL : api_URL+'/Services'
})

export const getPatientHistory = axios.create({
    baseURL : api_URL+'/Visitation'
})

export const getDoctorHistory = axios.create({
    baseURL : api_URL+ "/Visitation/Administer"
})