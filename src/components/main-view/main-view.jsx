import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState ([
    {
      id: 1,
      title: 'The Shawshank Redemption',
      description: 'Andy Dufresne (Tim Robbins) is sentenced to two consecutive life terms in prison for the murders of his wife and her lover and is sentenced to a tough prison. However, only Andy knows he didnt commit the crimes. ',
      genre: 'Drama',
      director: 'Frank Darabont',
      imageURL: 'https://en.wikipedia.org/wiki/The_Shawshank_Redemption#/media/File:ShawshankRedemptionMoviePoster.jpg',
      year: '1994'
  },
  {
      id: 2,
      title: 'Fight Club',
      description: 'A depressed man (Edward Norton) suffering from insomnia meets a strange soap salesman named Tyler Durden (Brad Pitt) and soon finds himself living in his squalid house after his perfect apartment is destroyed.',
      genre: 'Drama',
      director: 'David Fincher',
      imageURL: 'https://en.wikipedia.org/wiki/Fight_Club#/media/File:Fight_Club_poster.jpg',
      year: '1999'
  },
  {
      id: 3,
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      description: 'The first adventure in The Lord of the Rings trilogy!',
      genre: 'Adventure',
      director: 'Peter Jackson',
      imageURL: 'https://en.wikipedia.org/wiki/The_Lord_of_the_Rings:_The_Fellowship_of_the_Ring#/media/File:The_Lord_of_the_Rings,_TFOTR_(2001).jpg',
      year: '2001'
  }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
        key = {movie.id}
        movie = {movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
        />
      ))}
    </div>
  );

};


