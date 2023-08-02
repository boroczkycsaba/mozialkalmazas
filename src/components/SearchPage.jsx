import { TextField, createTheme, ThemeProvider, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { SearchResults } from "./SearchResults";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export const SearchPage = () => {
  const [searchText,setSearchText] =useState("")
  const [fetchData,setFetchData] = useState(false)
  const [type,setType] = useState(0)

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleChangeText=(e) => {
    setFetchData(false)
    setSearchText(e.target.value)
  }
  const handleChangeType=(e,newValue) => {
    setType(newValue)
  }

  //console.log(searchText,type)

  return (
  <div>
    <ThemeProvider theme={darkTheme}>
      <div style={{ display: "flex", maxWidth: "300px",justifyContent:'center',margin:"15px auto" }}>
        <TextField label="Search" variant="filled" 
          onChange={handleChangeText}
        />
        <Button variant='contained' onClick={()=>setFetchData(true)}>
          <SearchIcon />
        </Button>
      </div>
      <Tabs value={type} textColor="primary" centered indicatorColor="primary" onChange={handleChangeType}>
        <Tab label="Search Movies"/>
        <Tab label="Search TV Series"/>
      </Tabs>
    </ThemeProvider>
    {fetchData && <SearchResults searchText={searchText} type={type ? 'tv' : 'movie'}/>}
    </div>
  );
};
