import {createStyles, makeStyles} from "@material-ui/core/styles"


export const useStyles = makeStyles((theme) => createStyles({
    root: {
        "& .MuiDataGrid-renderingZone" : {
            "& .MuiDataGrid-columnHeaderWrapper" : {
                color : "white"
            },
            "& .MuiDataGrid-row" : {
                color : "black",
                "&:nth-child(2n)" : {
                    backgroundColor : "rgba(235, 235, 235, 0.7)"
                },
                "&:nth-child(2n-1)" :{
                    backgroundColor : "rgba(245, 235, 235, 0.5)"
                }
            }
        }
    }
}));
