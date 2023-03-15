import './SideBar.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';


const SideBar = () => {

    return (
        <Box 
        sx={{
          width: '30%',
          height:'960px',
          backgroundColor: '#3E3E3E',
        }}>
        <Box sx={{color:'#86EAF0', padding:'2%'}}>
            <AccountCircleIcon sx={{ fontSize: 32 }}></AccountCircleIcon>
            <text style={{position:'absolute', padding:'0.3%'}}>Login</text>
        </Box>
        
        <Box
            sx={{
                textAlign:'center',
                position: 'absolute',
                bottom:0
            }}>
            <img src='logo.png' style={{width:'35%', height:'20%'}}></img>
            
        </Box>
        
        {/* <ContactSupportOutlinedIcon sx={{position: 'absolute', bottom:0, left:100}}></ContactSupportOutlinedIcon> */}
        </Box>
    );
}

export default SideBar;