import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;

    return 
    
    <div className="movie-title" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
    <div className="movie-image" onClick={() => { onMovieClick(movie); }}>{movie.ImgPath}</div>;
    <div className="movie-summary" onClick={() => { onMovieClick(movie); }}>{movie.Description}</div>;
  }
}