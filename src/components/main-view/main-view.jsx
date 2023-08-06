import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


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

    fetch('https://sargur-movies-9fe33be3ebb3.herokuapp.com/movie', {
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


  return (
    
<Row className="justify-content-md-center">
      {!user ? (
        <Col md = {4}>
        <LoginView 
        onLoogedIn={(user,token) => {
          setUser(user);
          setToken(token);
        }} 
        />
        or 
        <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md = {8}>
        <MovieView 
        movie={selectedMovie}
        onBackClick={() =>
        setSelectedMovie(null) } />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
        {movies.map((movie)=> (
          <Col>
          <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }} />
          </Col>
        ))}
        <Button onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}>
          Logout
        </Button>
        </>
      )}
    </Row>
  )

};


