import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";


export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

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

      <Link to={"/"}>
        <Button className="back-button">Back</Button>
      </Link>
    </div>
  );
};
