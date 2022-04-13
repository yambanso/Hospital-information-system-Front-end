import { Accessible, AccountCircle } from "@material-ui/icons"
import { userColumns, userRows, patientsRows, patientsColumns } from "../../data/tableData"
import "./home.css"
import { getUserCount,getPatientCount, getPatients, getUsers } from '../../apiCalls'
import { useState, useEffect } from 'react'
import Datatable from '../../Receptipnist/Home/Data-table';

 /**
  * @return Home page for the admin window
  * @auth Lusngu gondwe
  */

export default function Home() {
    const count = 0 ;
    const pcount = 0;
    const [usercount, setCount] = useState(count);
    const [patientcount, setPcount] = useState(pcount)
    const [prows, setProws] = useState(patientsRows)
    const [urows, setUrows] = useState(userRows)

    /** 
    * @description this function fetches data from the Api sets state to different variable for the page
    */
     const fetchData = async () => {

        getUserCount.get('/').then(res => {
            setCount(res.data)
        })
    
        getPatientCount.get('/').then(res => {
            setPcount(res.data)
        })
    
        getPatients.get('/').then(res =>{
            setProws(res.data)
        })
    
        getUsers.get('/').then(res => {
            setUrows(res.data)
        })

    }

    /** 
     * @description function is called after first page render and is call the fetchdata method to fetch data from the API
     *  
     */
    useEffect(() => {
        fetchData()
    }, [])

    
    
    return (
        <div className='home'>

            <div className="homeTop">

                <div className="homeLeft">

                    <div className="userHead">
                    <AccountCircle className="userIcon"/>
                     <div className="userInfo">
                            <span className="userTitle">                            
                                Users
                            </span>
                            <span className="userCount">{usercount}</span>
                        </div>    
                    </div>

                </div>

                <div className="homeright">

                <div className="patientHead">
                    <Accessible className="patientIcon"/>
                     <div className="patientInfo">
                            <span className="patientTitle">                            
                                Patients
                            </span>
                            <span className="patientCount">{patientcount}</span>
                        </div>    
                    </div>
                    
                </div>
            </div>
            <div className="homeBottom">
                
                <div className="homeBottomLeft">
                    <span className="infoTitle">
                        Users Overview
                    </span>
                    <div className="userTable">
                    <div className="usersTable">
                        {/** 
                         * @description the Datatable is a custom component that is used to Display data in a table and passing in the data and the columns 
                         */}
                        <Datatable Data={urows} columns={userColumns}/>
                        
                        </div>
                    </div>
                    
                </div>
                <div className="homeBottomRight">
                <span className="infoTitle">
                        Patients Overview
                    </span>
                    <div className="patientsTable">
                    <div className="patientsTable">
                    {/** 
                     * @description the Datatable is a custom component that is used to Display data in a table and passing in the data and the columns 
                     * 
                    */}
                    <Datatable Data={prows} columns={patientsColumns}/>
                        
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    )
}
