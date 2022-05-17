import React from 'react';

export class MovieView extends React.Component {

  render() {
    const { movieData, onBackClick } = this.props;

    return (
      <div className="movie-view">
          <div className="movie-image">
            <img src={movie.ImgPath} />
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
          <div className="movie-rating">
            <span className="label">Movie Rating: </span>
            <span className="value">{movie.Rating}</span>
          </div>
          <div className="movie-release">
            <span className="label"> Theater Release Date: </span>
            <span className="value">{movie.ReleaseDate}</span>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
          </div>
          <div className="movie-director__bio">
            <span className="label">Director biography: </span>
            <span className="value">{movie.Director.Biography}</span>
          </div>
          <div className="movie-director__DOB">
            <span className="label">Director Birthdate: </span>
            <span className="value">{movie.Director.Birthdate}</span>
          </div>
          <div className="movie-director__POB">    /* POC is place of birth */
            <span className="label">Director Birthplace: </span>
            <span className="value">{movie.Director.Birthplace}</span>
          </div>
          <div className="movie-director__DOD">    /* DOD is date of death */
            <span className="label">Director Deathdate: </span>
            <span className="value">{movie.Director.Deathdate}</span>
          </div>
          <button onClick={() => { onBackClick(null);}}>Back</button>
      </div>    
    );
  }
}