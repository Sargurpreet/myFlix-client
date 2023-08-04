import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";


export const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user")); 
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser:null);
  const [token, setToken] = useState(storedToken? storedToken:null);

  useEffect(() =>{

    if(!token) {
      return;
    }

    fetch('https://sargur-movies-9fe33be3ebb3.herokuapp.com', {
      headers: { Authorization: `Bearer ${token}`}
    })
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
    })
    .catch((error) => {
      console.error("Error fetching: ", error);
    });
  }, [token]);

  if (!user) {
    return (
      <>
      <LoginView onLoogedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }}/>
      or
      <SignupView />
      </>
    );
  }

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
      <button
      onClick={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}>
        Logout
      </button>
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


