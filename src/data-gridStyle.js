import {createStyles, makeStyles} from "@material-ui/core/styles"

/** creating custom styles for our materia ui datagrid */
export const useStyles = makeStyles((theme) => createStyles({
    root: {
        "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer" : {
                display : "none"
        },        
        "& .MuiDataGrid-renderingZone" : {

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
