import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

/** setting our API URL */
export const api_URL = "http://127.0.0.1:8000/api"

/** setting a user authentication method */
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

/** exporting different API routes */
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

export const addUser = axios.create({
    baseURL : api_URL+"/user_Registration"
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
export const getWithoutPrescriptions = axios.create({
    baseURL : api_URL + "/Visitation_without_Prescription"
})
export const getPrescription = axios.create({
    baseURL : api_URL + "/Visitation_Prescription"
})

export const getLab = axios.create({
    baseURL : api_URL + "/lab_test_orders"
})
export const getVisits = axios.create({
    baseURL : api_URL + "/active_visits"
})

export const getPivot = axios.create({
    baseURL : api_URL + "/Visitation_pivot"
})

export const getReport = axios.create({
    baseURL : api_URL + "/report"
})

export const getMonthlyPrescribed = axios.create({
    baseURL : api_URL + "/reportMonthlyMeds"
})

export const getMonthlyUnprescribed = axios.create({
    baseURL : api_URL + "/reportMonthlyMedsUnPrescribed"
})

export const getDiagnosis = axios.create({
    baseURL : api_URL + "/Diagnosis"
})
