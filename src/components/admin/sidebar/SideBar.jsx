import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TheatersIcon from "@mui/icons-material/Theaters";
import StorageIcon from "@mui/icons-material/Storage";
import UserList from "../users/UserList";
import MovieList from "../movies/MovieList";
import ServerList from "../servers/ServerList";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import AddMovieCard from "../movies/AddMovieCard";

const drawerWidth = 15;

export default function SideBar() {
  const [selected, setSelected] = useState(0);
  const [movieCard, setMovieCard] = React.useState({
    opened: false,
    movie: null,
  });

  const getMovieTitle = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div></div>
        <div>Movies</div>
        <IconButton aria-label="add" onClick={addMovieClicked}>
          <AddIcon />
        </IconButton>
      </div>
    );
  };

  const closeCard = () => {
    setMovieCard({ opened: false });
  };

  const addMovieClicked = () => {
    setMovieCard({ opened: true, closeCard: closeCard });
  };

  const getUserTitle = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          height: "auto",
        }}
      >
        <div></div>
        <div>User</div>
        <div style={{ width: "40px", height: "40px" }}></div>
      </div>
    );
  };

  const getServerTitle = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          height: "auto",
        }}
      >
        <div></div>
        <div>Server</div>
        <div style={{ width: "40px", height: "40px" }}></div>
      </div>
    );
  };

  const getSelectedName = () => {
    switch (selected) {
      case 0:
        return getMovieTitle();
      case 1:
        return getUserTitle();
      case 2:
        return getServerTitle();
    }
  };

  const sideIcons = (i) => {
    switch (i) {
      case 0:
        return <TheatersIcon />;
      case 1:
        return <PeopleAltIcon />;
      case 2:
        return <StorageIcon />;
    }
  };

  const panelContent = (i) => {
    switch (i) {
      case 0:
        return <MovieList />;
      case 1:
        return <UserList />;
      case 2:
        return <ServerList />;
    }
  };

  const sideIconClicked = (e, index) => {
    e.preventDefault();
    setSelected(index);
  };

  return (
    <div>
      <AddMovieCard data={movieCard} />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}%)`,
            ml: `${drawerWidth}px`,
            marginTop: "70px",
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div" width="100%">
              {getSelectedName()}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: "drawerWidth",

            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: `${drawerWidth}%`,
              boxSizing: "border-box",
              marginTop: "70px",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {["Movies", "Users", "Servers"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  selected={index == selected}
                  onClick={(e) => sideIconClicked(e, index)}
                >
                  <ListItemIcon>{sideIcons(index)}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            marginLeft: "auto",
            flexGrow: 0,
            bgcolor: "background.default",
            p: 3,
          }}
        >
          <Toolbar />
          <div>{panelContent(selected)}</div>
        </Box>
      </Box>
    </div>
  );
}
