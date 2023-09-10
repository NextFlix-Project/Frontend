import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
 import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import axios from "axios";

import './NavBar.css';
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
    console.log(props)
  const auth =  props.auth;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {

    await axios
    .get(process.env.server_base + "/api/v1/user/logout",   {withCredentials: true})
    .then((response) => {
      navigate('/');
      handleClose();
    })
    .catch((error) => {
      navigate('/');
      handleClose();
    });
  }

  const logoClicked = (e) => {
    e.preventDefault();
    navigate('/');
  }

  const adminClicked = (e) => {
    e.preventDefault();
    navigate('/admin');
  }
  
  return (
    <div className="navBar">
      <Box>
 
        <AppBar position="static" height='10px'>
          <Toolbar className='toolBar'>
 
            <Typography onClick={logoClicked} variant="h6" component="div" sx={{flexGrow: 1, textAlign:'left', fontFamily:'Avenir', fontWeight:'800', fontSize:'2em'  }}>
              NextFlix
            </Typography>
            {auth && auth.role === 'ADMIN' && (
            <Typography onClick={adminClicked} variant="h6" component="div" sx={{flexGrow: 1, textAlign:'right', fontFamily:'Avenir', fontWeight:'400', fontSize:'1em'  }}>
              Admin
            </Typography>
            )}
            {auth && (
                
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>

          
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
export default NavBar;
