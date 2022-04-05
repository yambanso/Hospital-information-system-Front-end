import React, {useRef,useState} from 'react'
import './report.css'
import { LocalPrintshop } from "@material-ui/icons";
import Box from '@mui/material/Box';
import Monthly from "./Monthly"
import ReactToPrint from 'react-to-print';
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from "@mui/lab/TabList"
import TabPanel from '@mui/lab/TabPanel'
import Disease from './Disease';
import LstMonthlyDisease from './LstMonthlyDisease';
import LstMonthFin from './LstMonthFin';
import ThisYrFin from './thisYrFin';
import ThisYrDis from './thisYrDis';
import LstYrDis from './lstYrDis';
import LstYrFin from './lstYrFin';

export default function Report() {
    const [ value , setValue] = useState("1")
    const [tValue, setTvalue] = useState("1")
    const compRef = useRef();

    const handleChange = (event, newValue) => {
      setValue(newValue)
    }
    const topHandleChange = (event, newVal) => {
      setTvalue(newVal)
    }

  return (
    <div className='home'>
        <div className="HomeTop">
                <div className="homeInput">
                    
                      <span className="heading">Report</span>
                </div>
                </div>
                <div className="printButton">
                    <ReactToPrint
                        trigger={() => <button className='displayBtn' style={{backgroundColor : "#1FFF63"}}>
                            <LocalPrintshop className='displayIcon'/>
                            Print</button>}
                        content={() => compRef.current}
                    />
                </div>
                <div className="homeBtm">
                <Box sx={{widith : '100%', typography : "body1", margin : '10px'}}> 
                <TabContext value={tValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={topHandleChange} aria-label="lab API tabs example">
                  <Tab label="This Month" value="1" />
                  <Tab label="Last Month" value="2" />
                  <Tab label="This year" value="3" />
                  <Tab label="Last Year" value ="4" />
                  </TabList>
                  </Box> 
                 <TabPanel value = "1">
                 <Box sx={{ width: '100%', typography: 'body1', margin : '10px' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="This Month's Financial Report" value="1" />
                        <Tab label="This Month's Diagnosis Report" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <div ref={compRef}>
                        <Monthly />
                      </div>
                    </TabPanel>
                    <TabPanel value="2">
                      <div ref={compRef}>
                        <Disease />
                      </div>
                    </TabPanel>
                    </TabContext>
                    </Box>
                   </TabPanel> 
                 <TabPanel value="2"> 
                <Box sx={{ width: '100%', typography: 'body1', margin : '10px' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Last Month's Financial Report" value="1" />
                        <Tab label="Last Month's Diagnosis Report" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <div ref={compRef}>
                        <LstMonthFin />
                      </div>
                    </TabPanel>
                    <TabPanel value="2">
                      <div ref={compRef}>
                        <LstMonthlyDisease />
                      </div>
                    </TabPanel>
                    </TabContext>
                    </Box>
                    </TabPanel>
                   <TabPanel value = "3">
                   <Box sx={{ width: '100%', typography: 'body1', margin : '10px' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="This Years Financial Report" value="1" />
                        <Tab label="This Years Diagnosis Report" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <div ref={compRef}>
                        <ThisYrFin />
                      </div>
                    </TabPanel>
                    <TabPanel value="2">
                      <div ref={compRef}>
                        <ThisYrDis />        
                      </div>
                    </TabPanel>
                    </TabContext>
                    </Box>                
                     </TabPanel>
                    <TabPanel value="4">
                    <Box sx={{ width: '100%', typography: 'body1', margin : '10px' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Last Year's Financial Report" value="1" />
                        <Tab label="Last Year's Diagnosis Report" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <div ref={compRef}>
                      <LstYrFin />
                      </div>
                    </TabPanel>
                    <TabPanel value="2">
                      <div ref={compRef}>
                      <LstYrDis />
                      </div>
                    </TabPanel>
                    </TabContext>
                    </Box>
                
                      </TabPanel>  
                    </TabContext>
                    </Box>
                    </div>      

    </div>
  )
}
