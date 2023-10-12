import React, { useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import axios from "axios";
import WatchList from "../../components/watchlist/WatchList";

import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const auth = props.auth;
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const [watchListOpened, setWatchListOpened] = useState(false);
  const watchListRef = useRef(null);

  
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
      .get(process.env.server_base + "/api/v1/user/logout", {
        withCredentials: true,
      })
      .then((response) => {
        navigate("/");
        handleClose();
      })
      .catch((error) => {
        navigate("/");
        handleClose();
      });
  };

  const logoClicked = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const adminClicked = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  const watchListClicked = (e, value) => {
    e.preventDefault();

    if (watchListRef.current) watchListRef.current.updateWatchList();
    setWatchListOpened(value);
  };
  return (
    <div className="navBar">
      <Box>
        <AppBar position="static" height="10px">
          <Toolbar className="toolBar">
            <Typography
              onClick={logoClicked}
              variant="h6"
              component="div"
              sx={{
                flexGrow: 0,
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "2.5em",
                color:'red',
                cursor:'pointer',
                

              }}
            >
              NextFlix
            </Typography>
         
            <div style={{ display: "flex", flexDirection: "row", alignItems:'center' }}>
            {auth && (
              <Typography
                onClick={(e) => {
                  watchListClicked(e, true);
                }}
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 0,
                  textAlign: "right",
                  fontWeight: "400",
                  fontSize: "1.25rem",
                  cursor: 'pointer'
                }}
              >
                WatchList
              </Typography>
            )}
              {auth && auth.role === "ADMIN" && (
                <Typography
                  onClick={adminClicked}
                  variant="h6"
                  component="div"
                  sx={{
                    marginLeft: "20px",
                    flexGrow: 0,
                    textAlign: "right",
                    fontWeight: "400",
                    fontSize: "1.25rem",
                    cursor: 'pointer'
                  }}
                >
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
                  <AccountCircle fontSize='large'/>
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
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
                
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
              
            )}
              </div>
          </Toolbar>
        </AppBar>
        <WatchList
          ref={watchListRef}
          opened={watchListOpened}
          close={watchListClicked}
        />
      </Box>
    </div>
  );
};
export default NavBar;
