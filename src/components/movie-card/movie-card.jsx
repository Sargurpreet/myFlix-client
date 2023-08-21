import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../movie-card/movie-card.scss';

export const MovieCard = ({ movie }) => {
  console.log('Movie:', movie);

  return (
    <Card >
      <Link to={`/movie/${encodeURIComponent(movie._id)}`}>
      <Card.Img variant='top' src={movie.ImagePath}  style={{width:'100%', height: '450px'}}/>
      </Link>
      <Card.Body>      
        <Link to={`/movie/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">
            <Card.Title>{movie.Title}</Card.Title>
          </Button>        
        </Link>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        
      
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string 
    }),
  }).isRequired,
};


