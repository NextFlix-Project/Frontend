import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useMediaQuery } from "@mui/material";

const WatchList = forwardRef((props, ref) => {
  const [movies, setMovies] = useState({
    data: {
      movies: [],
      checked: [],
      watchlist: [],
      fadeIn: [],
      ratings: [],
    },
  });

  const watchListRef = useRef();
  useImperativeHandle(ref, () => ({
    updateWatchList() {
      getWatchList();
    },
  }));

  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:800px)");

  useEffect(() => {
    getWatchList();
  }, []);

  const getWatchList = () => {
    axios
      .get(process.env.server_base + "/api/v1/movie/getallmovies", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);

        const data = {
          movies: response.data.movies,
          watchlist:
            response.data.watchList !== undefined
              ? response.data.watchList
              : [],
          ratings:
            response.data.ratings !== undefined ? response.data.ratings : [],
          fadeIn:
            response.data.watchList !== undefined
              ? Array(response.data.watchList.length).fill(false)
              : [],
          checked:
            response.data.watchList !== undefined
              ? Array(response.data.watchList.length).fill(false)
              : [],
        };

        setMovies({
          data: data,
        });
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };
  const removeFromWatchList = (e, index) => {
    e.preventDefault();

    e.stopPropagation();

    axios
      .post(
        process.env.server_base + "/api/v1/watchlist/delete",
        {
          id: movies.data.watchlist[index].id,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        getWatchList();
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const handleMovieClicked = (e, index) => {
    e.preventDefault();
    navigate("/video", { state: movies.data.watchlist[index].movie });
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
    e.preventDefault();
    e.stopPropagation();
    const fadeInArr = Array(movies.data.watchlist.length).fill(false);
    const checkedArr = Array(movies.data.watchlist.length).fill(false);

    fadeInArr[index] = value;

    setMovies({
      data: {
        movies: movies.data.movies,
        checked: checkedArr,
        fadeIn: fadeInArr,
        watchlist: movies.data.watchlist,
        ratings: movies.data.ratings,
      },
    });
  };
  const calcRating = (id) => {
    const movieRatings = movies.data.ratings.filter(
      (rating) => rating.movie.id === id
    );

    if (movieRatings.length === 0) {
      return 0;
    }

    const sum = movieRatings.reduce((acc, obj) => acc + obj.rating, 0);
    const average = sum / movieRatings.length;

    return average;
  };

  const handleOpen = () => {
    getWatchList();
  };

  const renderWatchList = () => {
    return (
      <ImageList
        sx={{ width: "100%", height: "100%" }}
        cols={matches ? 3 : 2}
        gap={20}
      >
        {movies.data.watchlist.map((movie, index) => {
          return (
            <ImageListItem
              key={index}
              onClick={(e) => handleMovieClicked(e, index)}
              onMouseOver={(e) => toggleFade(e, index, true)}
              onMouseLeave={(e) => toggleFade(e, index, false)}
              sx={{ margin: "auto", zIndex: 10 }}
            >
              <img
                style={{
                  maxWidth: "100%",
                  height: "20vw",
                  width: "30vw",
                  maxHeight: "20vw",
                  backgroundColor: "black",
                }}
                src={`${process.env.server_base}/api/v1/file/image?movieId=${movie.movie.id}`}
                onError={(e) => {
                  e.target.src = "./nextflix.png";
                }}
                alt={movie.movie.title}
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
          <div style={{fontSize:'1.5rem', paddingLeft:'15px'}}>
                {movie.movie.title}
              </div>
          
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
                    defaultValue={calcRating(movie.movie.id)}
                    sx={{ fontSize: "3.2vmin" }}
                    size="large"
                    precision={1}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      handleRatingClicked(e, index);
                    }}
                  />
                </Stack>
              </div>
              {movies.data.fadeIn[index] && (
                <div>
                  <Zoom in={!movies.data.checked[index]}>
                    <Fab
                      color="primary"
                      aria-label="add"
                      variant="circular"
                      onClick={(e) => {
                        removeFromWatchList(e, index);
                      }}
                      sx={{
                        position: "absolute",
                        right: 10,
                        top: 10,
                        zIndex: 5,
                      }}
                    >
                      <DeleteIcon />
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
    <SwipeableDrawer
      open={props.opened}
      sx={{
        width: "100%",
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: "100%" },
        height: "auto",
      }}
    >
      <div style={{ display: "flex" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          width="100%"
          marginTop="10px"
          textAlign="center"
          sx={{fontSize:"3rem", fontWeight:'bold'}}
        >
          Watch List
        </Typography>
        <IconButton
          aria-label="delete"
          size="large"
          sx={{  height: '75px', width: '75px'}}
          onClick={(e) => {
            props.close(e, false);
          }}
        >
          <CloseIcon fontSize="large"/>
        </IconButton>
      </div>
      {renderWatchList()}
    </SwipeableDrawer>
  );
});

export default WatchList;
