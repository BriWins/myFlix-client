import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Button, Card } from "react-bootstrap/";

export class MovieCard extends React.Component {
  render() {
      const { movie } = this.props;
    return (
          <Card>
              <Card.Img crossorigin="anonymous" src={movie.ImgPath} className="movie-image" 
              onClick={() => { onMovieClick(movie);}}/>
              <Card.Body>
                <Card.Title> {movie.Title} </Card.Title>
                <Card.Text> {movie.Description}</Card.Text>
                  <Link to={"/movies/${movie._id"}>
                    <Button variant="link">Open</Button>
                  </Link>
              </Card.Body>
          </Card>
      );
    }
  }

MovieCard.propTypes = {
  movie: PropTypes.shape({
  Title: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  ImgPath: PropTypes.string.isRequired
  })
  .isRequired, onMovieClick: PropTypes.func.isRequired
};