import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
 import MovieCard from "./MovieCard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import './MovieList.css';

const MovieList = () => {
   const [movies, setMovies] = React.useState(null);

  
   const [movieData, setMovieData] = React.useState(null);
   const [movieCard, setMovieCard] = React.useState({ opened: false, movie: null });
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
 
   const columns = [
     { id: "title", label: "Title", minWidth: 170 },
     { id: "description", label: "Description", minWidth: 200 },
     { id: "url", label: "Url", minWidth: 200 },
     { id: "boxArtUrl", label: "Box Art URL", minWidth: 200 },
     { id: "releaseDate", label: "Release Date", minWidth: 100 },
     { id: "active", label: "Active", minWidth: 50 },
   ];
 
   const closeCard = () => {
     axios
     .get("http://127.0.0.1:8080/api/v1/admin/movie/getallmovies", {
      withCredentials: true,
       })
       .then((response) => {
        setMovies(response.data);
        
       
         setMovieCard({ opened: false, movie: null });
       })
       .catch((error) => {
         console.error("Error:", error.message);
       });
   };
 
   const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };
 
   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(+event.target.value);
     setPage(0);
   };
 
   const handleClick = (e, index) => {
     e.preventDefault();
 
     setMovieCard({ opened: true, movie: movies[index], closeCard: closeCard });
   };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/v1/admin/movie/getallmovies", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data)
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  if (movies === null) return;
  return ( 
    <div className="admin-dashboard">
    <MovieCard data={movieCard} />
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {movies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const originalIndex = page * rowsPerPage + index;
                return (
                  <TableRow
                    onClick={(e) => handleClick(e, originalIndex)}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    {columns.map((column) => {
                      const value = row[column.id].toString();
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={movies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  </div>
  );
}

export default MovieList;
