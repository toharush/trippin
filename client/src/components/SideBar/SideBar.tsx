import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SideBar() {
  return (
    <Box sx={{backgroundColor: '#3E3E3E', height:'100vh', position:'relative'}}>
      <Box sx={{color:'#86EAF0', padding:'2%'}}>
         <AccountCircleIcon sx={{ fontSize: 30 }}></AccountCircleIcon>
         <text style={{position:'absolute', padding:'0.3%'}}>Login</text>
      </Box>
      <Box
         sx={{
             textAlign:'center',
             position: 'absolute',
             bottom:0
         }}>
        <img src='logo.png' style={{width:'35%', height:'auto'}}></img>  
     </Box>
    </Box>
  );
}