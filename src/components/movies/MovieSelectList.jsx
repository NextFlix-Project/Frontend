import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMediaQuery } from "@mui/material";
import './MovieSelectList.css';

const MovieSelectList = () => {
  const [movies, setMovies] = useState({
    movies: [],
    checked: [],
    watchlist: [],
    fadeIn: [],
    ratings: [],
  });

  const [watchList, setWatchList] = useState(new Map());

  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:800px)");

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    axios
      .get(process.env.server_base + "/api/v1/movie/getallmovies", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.watchList !== undefined)
          setWatchList(
            new Map(
              response.data.watchList.map((watchItem) => [
                watchItem.movie.id,
                watchItem,
              ])
            )
          );

        setMovies({
          movies: response.data.movies,
          ratings: response.data.ratings,
          watchlist:
            response.data.watchList !== undefined
              ? response.data.watchList
              : [],
          checked: Array(response.data.movies.length).fill(false),
          fadeIn: Array(response.data.movies.length).fill(false),
        });
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
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

  const addToWatchList = (index) => {
    axios
      .post(
        process.env.server_base + "/api/v1/watchlist/add",
        {
          id: movies.movies[index].id,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        getMovies();
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const removeFromWatchList = (index) => {
    axios
      .post(
        process.env.server_base + "/api/v1/watchlist/delete",
        {
          id: watchList.get(movies.movies[index].id).id,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        getMovies();
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const handleAddWishlist = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    if (watchList.has(movies.movies[index].id)) removeFromWatchList(index);
    else addToWatchList(index);
  };
  const handleMovieClicked = (e, index) => {
    e.preventDefault();
    navigate("/video", { state: movies.movies[index] });
  };

  const toggleFab = (e, index, value) => {
    e.preventDefault();

    e.stopPropagation();

    if (watchList.has(movies.movies[index].id)) return;

    const checkedArr = Array(movies.movies.length).fill(false);

    checkedArr[index] = value;

    const movieData = {
      movies: movies.movies,
      checked: checkedArr,
      fadeIn: movies.fadeIn,
      ratings: movies.ratings,
      watchlist: movies.watchlist,
    };
    setMovies(movieData);
  };

  const toggleFade = (e, index, value) => {
    e.preventDefault();
    e.stopPropagation();
    const fadeInArr = Array(movies.movies.length).fill(false);
    const checkedArr = Array(movies.movies.length).fill(false);

    fadeInArr[index] = value;

    setMovies({
      movies: movies.movies,
      checked: checkedArr,
      fadeIn: fadeInArr,
      ratings: movies.ratings,
      watchlist: movies.watchlist,
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

  return (
    <ImageList
      sx={{ width: "100%", height: "100%", overflow:'visible'}}
      cols={matches ? 3 : 2}
      gap={20}
    >
      {movies.movies.map((movie, index) => {
        return (
          <ImageListItem
          className="movie"
            key={index}
            onClick={(e) => handleMovieClicked(e, index)}
            onMouseOver={(e) => toggleFade(e, index, true)}
            onMouseLeave={(e) => toggleFade(e, index, false)}
          >
            <img
              style={{
                maxWidth: "100%",
                backgroundColor: "black",
                height: "20vw",
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
              <div style={{fontSize:'1.5rem', paddingLeft:'15px'}}>
                {movie.title}
              </div>
          
              <Stack
                spacing={1}
                sx={{
                  backgroundColor: "black",
                  marginRight: "10px",
                  maxWidth: "50%",
                  justifyContent: "center",
                }}
              >
                <Rating
                  name="size-large"
                  defaultValue={calcRating(movie.id)}
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
                     {watchList.has(movie.id) ? <DeleteIcon /> : <AddIcon />}
                  </Fab>
                </Zoom>
                <Zoom
                  in={movies.checked[index]}
                  timeout={10}
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

export default MovieSelectList;
