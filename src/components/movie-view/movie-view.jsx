import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
          <img src={movie.ImagePath}/>
        </div>
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
          <span>{movie.Featured}</span>
        </div>
        <Button onClick={onBackClick}>Back</Button>
    </div>
  );
};


MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired 
    }),
    Featured: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
