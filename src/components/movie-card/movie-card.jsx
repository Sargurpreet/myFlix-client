import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import '../movie-card/movie-card.scss'

export const MovieCard = ({ movie, onMovieClick }) => {
  console.log('Movie:', movie);
  console.log('Director:', movie.Director);

  return (
    <Card>
      <Card.Img variant='top' src={movie.ImagePath} alt={movie.Title} style={{width:'100%', height: '450px'}}/>
      <Card.Body>
        <Button onClick={() => onMovieClick(movie)} variant='link'>
        <Card.Title>{movie.Title}</Card.Title>
        </Button>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Card.Text>{movie.Genre.Name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired, 
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

