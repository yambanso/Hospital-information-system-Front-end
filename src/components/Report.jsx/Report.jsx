import React, {useState} from 'react'
import './report.css'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Monthly from "./Monthly"

export default function Report() {
    const [value , setValue] = useState('1')

    const handleChange= (event, newValue) => {
        setValue(newValue)
    }

  return (
    <div className='home'>
        <div className="HomeTop">
                <div className="homeInput">
                    
                      <span className="heading">Report</span>
                </div>
                </div>
                <div className="homeBtm">
                <Box sx={{ width: '100%', typography: 'body1', margin : '10px' }}>
                    <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            <Tab label="Monthly" value="1"/>
                            
                        </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Monthly />
                        </TabPanel>
                        
                    </TabContext>
                    </Box>
                    </div>      

    </div>
  )
}
