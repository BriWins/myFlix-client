
import React from 'react';
import { MovieView } from '../movie-view/movie-view';
import {MovieCard} from '../movie-card/movie-card'

export class MainView extends React.Component {

  constructor() {
      super();
      this.state = {
        movies: [],
        selectedMovie: null
      };
    }
  

  render() {

    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
         {movies.map(movie => <MovieCard key={movie._id} movieData={movie}/>)}
      </div>
    );
  }
}