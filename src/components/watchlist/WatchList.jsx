import React, { useState, useEffect } from "react";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
 
const WatchList = (props) => {

  const [movies, setMovies] = useState({
    movies: [],
    checked: [],
    watchlist: [],
    fadeIn: [],
    ratings: [],
  });
 
  const navigate = useNavigate();

  axios
    .get(process.env.server_base + "/api/v1/movie/getallmovies", {
      withCredentials: true,
    })
    .then((response) => { 
      setMovies({
        movies: response.data.movies,
        ratings: response.data.ratings,
        watchlist: response.data.watchList !== undefined ? response.data.watchList : [],
        checked: Array(response.data.movies.length).fill(false),
        fadeIn: Array(response.data.movies.length).fill(false),
      });
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
  useEffect(() => {
  }, []);


  const handleAddWishlist = (e, index) => {
    e.preventDefault();

    e.stopPropagation();
  };
  const handleMovieClicked = (e, index) => {
    e.preventDefault();
    navigate("/video", { state: movies.movies[index] });
    props.close(e, false);

  };
    
  const handleRatingClicked = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    axios
      .post(
        process.env.server_base + "/api/v1/rating/ratemovie",
        {
          movieId: movies.movies[index].id,  
          rating: parseInt(e.target.value),
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };


  const toggleFade = (e, index, value) => {
    const fadeInArr = Array(movies.movies.length).fill(false);
    const checkedArr = Array(movies.movies.length).fill(false);

    fadeInArr[index] = value;

    setMovies({
      movies: movies.movies,
      checked: checkedArr,
      fadeIn: fadeInArr,
      watchlist: movies.watchlist,
      ratings: movies.ratings,
    });
  };
  const calcRating = (id) => {
    const movieRatings = movies.ratings.filter(
      (rating) => rating.movie.id === id
    );

    if (movieRatings.length === 0) {
      return 0;
    }

    const sum = movieRatings.reduce((acc, obj) => acc + obj.rating, 0);
    const average = sum / movieRatings.length;

    return average;
  };

  const renderWatchList = () => {
    return (
      <ImageList sx={{ width: "100%", height: "100%" }} cols={3} gap={20}>
      {movies.watchlist.map((movie, index) => {
        console.log(`${process.env.server_base}/api/v1/file/image/${movie.id}`);
        return (
          <ImageListItem
            key={index}
   
 
             onClick={(e) => handleMovieClicked(e, index)}
            onMouseOver={(e) => toggleFade(e, index, true)}
            onMouseLeave={(e) => toggleFade(e, index, false)}
          >
            <img
              style={{
                maxWidth: "100%",
                height: "auto",
                width: "30vw",
                maxHeight: "20vw",
              }}
              src={`${process.env.server_base}/api/v1/file/image?movieId=${movie.id}`}
              onError={(e) => {
                e.target.src = "./nextflix.png";
              }}
              alt={movie.title}
              loading="lazy"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "30vw",
                maxHeight: "20vw",
                justifyContent: "space-between",
                backgroundColor: "black",
                alignContent: "center",

              }}
            >
              <ImageListItemBar
                title={movie.title}
                position="below"
                sx={{
                  backgroundColor: "black",
                  marginTop: "5px",
                  marginLeft: "10px",
                  maxWidth: "50%",
             
         
                }}
              />
              <Stack
                spacing={1}
                sx={{
                  backgroundColor: "black",
                  marginTop: "7px",
                  marginRight: "10px",
                  maxWidth: "50%",
             
             
                }}
              >
                <Rating
                  name="size-large"
                  defaultValue={calcRating(movie.id)}
                  size="large"
                  precision={1}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    handleRatingClicked(e, index);
                  }}
                />
              </Stack>
            </div>
            {movies.fadeIn[index] && (
              <div>
                <Zoom
                  in={!movies.checked[index]}
                  onMouseOver={(e) => toggleFab(e, index, true)}
                  onMouseLeave={(e) => toggleFab(e, index, false)}
                >
                  <Fab
                    color="primary"
                    aria-label="add"
                    variant="circular"
                    onClick={(e) => {
                      handleAddWishlist(e, index);
                    }}
                    sx={{
                      position: "absolute",
                      right: 5,
                      top: 5,
                      zIndex: 5,
                    }}
                  >
                    <AddIcon />
                  </Fab>
                </Zoom>
                <Zoom
                  in={movies.checked[index]}
                  timeout={50}
                  onMouseLeave={(e) => toggleFab(e, index, false)}
                  onMouseOver={(e) => toggleFab(e, index, true)}
                >
                  <Fab
                    color="primary"
                    aria-label="add"
                    variant="extended"
                    onClick={(e) => {
                      handleAddWishlist(e, index);
                    }}
                    sx={{
                      position: "absolute",
                      right: 5,
                      top: 5,
                      zIndex: 5,
                    }}
                  >
                    <AddIcon sx={{ mr: 1 }} />
                    Add to watchlist
                  </Fab>
                </Zoom>
              </div>
            )}
          </ImageListItem>
        );
      })}
    </ImageList>
    );
  };
  return (
    <Drawer
      variant="persistent"
      open={props.opened}
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: "100%" }, height:'auto'
      }}
    >
      <div style={{ display: "flex" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          width="100%"
          marginTop="10px"
        >
          Watch List
        </Typography>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={(e) => {
            props.close(e, false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </div>
      {renderWatchList()}
    </Drawer>
  );
};

export default WatchList;
