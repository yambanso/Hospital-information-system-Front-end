import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

/**
 * @exports api_URL
 * @description setting our API URL 
 **/
export const api_URL = "http://127.0.0.1:8000/api"

/**
 * @exports loginCall 
 * @description setting a user authentication method
 **/
export const loginCall = async(userCredentials,dispatch)=> {
    dispatch({type: "LOGIN_START"});
    try{ 
        const res  = await axios.post(api_URL+"/sign_in",userCredentials);
        dispatch({type: "LOGIN_SUCCESS" , payload : res.data});
        
    }catch(err){
        dispatch({type: "LOGIN_FAILURE" , payload : err});
    }
}

/**
 * @exports getUserCount
 * @description returns system users count 
 **/
export const getUserCount = axios.create({
    baseURL : api_URL+"/user_count"
}) 

/**
 * @exports getPatientCount
 * @description returns clients count
 */
export const getPatientCount = axios.create({
    baseURL : api_URL+"/patient_count"
})

/**
 * @exports getPatients
 * @description returns a list of clients
 */
export const getPatients = axios.create({
    baseURL :  api_URL+"/patients"
})
/**
 * @exports getUsers
 * @description returns a list of system users
 */
export const getUsers = axios.create({
    baseURL : api_URL+"/users"
})
/**
 * @exports addUser
 * @description returns an api request for creating new users
 */
export const addUser = axios.create({
    baseURL : api_URL+"/user_Registration"
})
/**
 * @exports getMedicine
 * @description returns a list of availble medications
 */
export const getMedicine = axios.create({
    baseURL : api_URL+'/Medication'
})
/**
 * @exports getServices
 * @description returns a list of all the available services
 */
export const getServices = axios.create({
    baseURL : api_URL+'/Services'
})
/**
 * @exports getPatientHistory
 * @description returns a client consultation history
 */
export const getPatientHistory = axios.create({
    baseURL : api_URL+'/Visitation'
})

/**
 * @exports getDoctorHistory
 * @description returns doctors consultation history
 */
export const getDoctorHistory = axios.create({
    baseURL : api_URL+ "/Visitation/Administer"
})
/**
 * @exports getWithoutPrescriptions
 * @description returns a list of all visits without prescriptions
 */
export const getWithoutPrescriptions = axios.create({
    baseURL : api_URL + "/Visitation_without_Prescription"
})
/**
 * @exports getPrescription
 * @description returns visits prescription
 */
export const getPrescription = axios.create({
    baseURL : api_URL + "/Visitation_Prescription"
})
/**
 * @exports getLab
 * @description returns visits that have lab test orders
 */
export const getLab = axios.create({
    baseURL : api_URL + "/lab_test_orders"
})
/**
 * @exports getVisits
 * @description returns a list of all active visits
 */
export const getVisits = axios.create({
    baseURL : api_URL + "/active_visits"
})
/**
 * @exports getPivot
 */
export const getPivot = axios.create({
    baseURL : api_URL + "/Visitation_pivot"
})
/**
 * @exports getReport
 */
export const getReport = axios.create({
    baseURL : api_URL + "/report"
})
/**
 * @exports getMonthlyPrescribed
 * @description returns a list of monthlys prescribed drugs that were given to a client
 */
export const getMonthlyPrescribed = axios.create({
    baseURL : api_URL + "/reportMonthlyMeds"
})
/**
 * @exports getMonthlyUnprescribed
 * @description returns a list of monthlys prescribed drugs that were not given to a client
 */
export const getMonthlyUnprescribed = axios.create({
    baseURL : api_URL + "/reportMonthlyMedsUnPrescribed"
})
/**
 * @exports getDiagnosis
 * @description returns disease diagnosis
 */
export const getDiagnosis = axios.create({
    baseURL : api_URL + "/Diagnosis"
})
