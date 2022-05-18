import React from "react";
import PropTypes from "prop-types";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <div>
        <div className="movie-title" onClick={() => { onMovieClick(movie) }}>
          {movie.Title}
        </div>
        <img src={movie.ImgPath} className="movie-image" onClick={() => { onMovieClick(movie);}}></img>
        <div className="movie-summary" onClick={() => { onMovieClick(movie); }}>
          {movie.Description}
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImgPath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};