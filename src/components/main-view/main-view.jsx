
import React from 'react';
import { MovieView } from '../movie-view/movie-view';
import {MovieCard} from '../movie-card/movie-card';

export class MainView extends React.Component {

  constructor() {
      super();
      this.state = {
        movies: [],
        selectedMovie: null
      };
    }
  
    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    render() {
      
      const { movieData, selectedMovie } = this.state;
    
      if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    
      return (
        <div className="main-view">
          {selectedMovie
            ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movieData} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
            ))
          }
        </div>
      );
    }
}