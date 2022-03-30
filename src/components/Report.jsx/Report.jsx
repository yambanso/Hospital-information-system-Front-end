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

export default function Report() {
    const [ value , setValue] = useState("1")
    const compRef = useRef();

    const handleChange = (event, newValue) => {
      setValue(newValue)
      console.log(newValue)
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
                        trigger={() => <button className='displayBtn'>
                            <LocalPrintshop className='displayIcon'/>
                            Print</button>}
                        content={() => compRef.current}
                    />
                </div>
                <div className="homeBtm">
                <Box sx={{ width: '100%', typography: 'body1', margin : '10px' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Monthly Financial Report" value="1" />
                        <Tab label="Monthly Diagnosis Report" value="2" />
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
                    </div>      

    </div>
  )
}
