import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem, Row } from "react-bootstrap";

export class MovieView extends React.Component {
  
  render() {
    const { movie, onBackClick } = this.props;

    return (
  <Container>
      <Row>
          <Col>
              <Card >
                  <Card.Body>

                      <Card.Img variant="top" src={movie.ImgPath} />
                      <Card.Title className="movie-title">{movie.Title}</Card.Title>
                      <Card.Text className="movie-summary">{movie.Description}</Card.Text>

                  <ListGroup className="list-group-flush">
                    <ListGroupItem className="movie-genre">Genre: {movie.Genre.Name}</ListGroupItem>
                    <ListGroupItem className="movie-director">Director: {movie.Director.Name}</ListGroupItem>
                  </ListGroup>

                  </Card.Body>
              </Card>
              <Button onClick={() => { onBackClick(null); }}>Back</Button>
          </Col>
      </Row>
  </Container>
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