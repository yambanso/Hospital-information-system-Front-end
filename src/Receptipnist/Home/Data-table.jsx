import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

/**
 * @function escapeRegExp
 * @description function is called wheneve the user has inserted on of the specified charecters in the function 
 *@returns charecters not eligible in the search field
 * */
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
/** 
 * @function QuickSearchToolbar
 * @descriptioncreating a search bar 
 * @returns a search tool bar
 * */
function QuickSearchToolbar(props) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto',
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          '& .MuiSvgIcon-root': {
            mr: 0.5,
          },
          '& .MuiInput-underline:before': {
            borderBottom: 1,
            borderColor: 'divider',
          },
        }}
      />
    </Box>
  );
}
/**
 * @description this method sets the props for our search bar 
 **/
QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

/**
 * @function Datatable
 * @param {*} props 
 * @returns a Datatabe
 */
export default function Datatable(props) {
  /**
   * @constant dat
   * @description calling the passed Data from parent component as props 
   **/
  let dat = props.Data;
  /** 
   * @description setting state for searching text 
   **/
  const [searchText, setSearchText] = React.useState('');
  const [rows, setRows] = React.useState(dat);
  const columns = props.columns  

  

  /**
   * @event requestSearch
   *  @description this function is called whenever the user types something in the search bar */
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = dat.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  /**
   *  @description function is called whenever dat changes value 
   **/
  React.useEffect(() => {
    setRows(dat);    
  }, [dat]);

  return (
    /** @description this Datagtid component displays data in table form*/
      <DataGrid
        components={{ Toolbar: QuickSearchToolbar }}
        rows={rows}
        columns={columns}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => {requestSearch('')
                                  setRows(dat)},
          },
        }}
        pageSize={8}
        rowsPerPageOptions={[8]}
      />
      );
}