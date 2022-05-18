import React from "react";

export class MovieView extends React.Component {
  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-image">
          <img src={movie.ImgPath}/>
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-summary">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
      <button onClick={() => { onBackClick(null);}}> Back </button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImgPath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired, 
  onBackClick: PropTypes.func.isRequired,
};