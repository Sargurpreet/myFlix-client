import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "../movie-view/movie-view.scss";
import { useSelector } from 'react-redux';


export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const movies = useSelector((state) => state.movies);
  
  useEffect(() => {
    const isFavorited = user && user.FavoriteMovies && user.FavoriteMovies.includes(movieId);
    setIsFavorite(isFavorited)
  }, []);
  
  const removeFavorite = () => {
    fetch(`https://sargur-movies-9fe33be3ebb3.herokuapp.com/user/${user.Email}/movie/${movieId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      if(response.ok) {
        return response.json()
      }
    }). then((data) => {
      setIsFavorite(false);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };
  
  const addToFavorite = () => {
    fetch(`https://sargur-movies-9fe33be3ebb3.herokuapp.com/user/${user.Email}/movie/${movieId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      if(response.ok) {
        return response.json()
      }
    }). then((data) => {
      setIsFavorite(true);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  }
  
  const movie = movies.find((m) => m._id === movieId);

  if(!movie) {
    return <div>Movie not found</div>
  }
  
  return (
    <div className="movie-view">
      <div className="movie-image">
        <img src={movie.ImagePath} alt={movie.Title} />
      </div>
      <div className="movie-details">
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span>Featured: </span>
          <span>{movie.Featured ? "Yes" : "No"}</span>
        </div>
        
      </div>

      <div className='button-container'>
      {isFavorite ? (
        <Button onClick={removeFavorite}>Remove from favorites</Button>
      ) : (
        <Button onClick={addToFavorite}>Add to favorites</Button>
      )}

      <Link to={"/"}>
        <Button className="back-button">Back</Button>
      </Link>
      </div>
    </div>
  );
};

