import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Button, Card } from "react-bootstrap/";

export class MovieCard extends React.Component {
  render() {

    const { movies } = this.props;

    return (
          <Card>
              <Card.Img crossorigin="anonymous" src={movies.ImgPath} className="movie-image" 
              onClick={() => {(onClick.movies);}}/>
              <Card.Body>
                <Card.Title> {movies.Title} </Card.Title>
                <Card.Text> {movies.Description}</Card.Text>
                  <Link to={ `/movies/${movies._id}` }>
                    <Button variant="link">Open</Button>
                  </Link>
              </Card.Body>
          </Card>
      );
    }
  }

MovieCard.propTypes = {
  movies: PropTypes.shape({
  Title: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  ImgPath: PropTypes.string.isRequired
  })
  .isRequired 
};