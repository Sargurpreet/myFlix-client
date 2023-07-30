import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { response } from "express";

export const MainView = () => {
 
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() =>{
    fetch('https://sargur-movies-0649fa2ac873.herokuapp.com/movie')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const moviesFromApi = data.map((movie) => {
        return {
          _id: movie.id,
          Title: movie.Title,
          Description: movie.Description,
          Director: {
            Name: movie.Director.Name
          },
          Genre: {
            Name: movie.Genre.Name
          },
          ImagePath: movie.ImagePath,
          Featured: movie.Featured.toString()    
        };
      });
      setMovies(moviesFromApi);
    });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie= {selectedMovie} onBackClick={() =>
      setSelectedMovie(null)} />
    );
  }


  if (movies.length === 0) {
    return <div>The list is empty!</div>
  }

  return(
    <div>
      {movies.map((movie) => (
        <MovieCard
        key = {movie.Title}
        movie = {movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
        />
      ))}
    </div>
  );

};


