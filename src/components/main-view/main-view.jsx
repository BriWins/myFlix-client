
import React from 'react';
import { MovieView } from '../movie-view/movie-view';
import {MovieCard} from '../movie-card/movie-card';

export class MainView extends React.Component {

  constructor() {
   // const { movie } = this.state;

      super();
      this.state = {
        movies: [
          {_id: 1, Title: "Black Panther", Description:"American superhero film based on the Marvel Comics character, Black Panther, depicted as the king and protector of the fictional African nation of Wakanda.", ImgPath: 'https://i.pinimg.com/originals/b8/ce/c7/b8cec7d7e348590d72a70c9441fc73e5.jpg'}
        ],
        selectedMovie: null
      };
    }
  
    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

   render() {
    const { movies, selectedMovie } = this.state;
  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
      <div className="main-view">
        {/* {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))      
        } */}
             {movies.map(movie => <div key={movie._id}>{movie.ImgPath}</div>)}
             {movies.map(movie => <div key={movie._id}>{movie.Description}</div>)}
             {movies.map(movie => <div key={movie._id}>{movie.Title}</div>)}
      </div>
    );
}
    }