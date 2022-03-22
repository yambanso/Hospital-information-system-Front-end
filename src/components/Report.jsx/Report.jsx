import React, {useRef} from 'react'
import './report.css'
import { LocalPrintshop } from "@material-ui/icons";
import Box from '@mui/material/Box';
import Monthly from "./Monthly"
import ReactToPrint from 'react-to-print';

export default function Report() {
    const compRef = useRef();


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
                            <div ref={compRef}>
                            <Monthly  />
                            </div>
                    </Box>
                    </div>      

    </div>
  )
}
