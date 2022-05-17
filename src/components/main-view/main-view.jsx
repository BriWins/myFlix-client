
import React from 'react';
import { MovieView } from '../movie-view/movie-view';
import {MovieCard} from '../movie-card/movie-card';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'desc1...', ImgPath: '...'},
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImgPath: '...'},
        { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImgPath: '...'}
      ]
    }
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
      {movies.map(movie => <div key={movie._id}>{movie.Title}</div>)}
      {movies.map(movie => <div key={movie._id}>{movie.Description}</div>)}
      {movies.map(movie => <div key={movie._id}>{movie.ImgPath}</div>)}
    </div>
    );
}
}
  