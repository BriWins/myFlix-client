import React from "react";
import { Card, Row, Container, Col, Button  } from "react-bootstrap/";

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }
  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Img crossorigin="anonymous" src={movie.ImgPath} className="movie-image"/>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text> {movie.Description} </Card.Text>
                {/* <Card.Text> {movies.ReleaseDate}</Card.Text>
                <Card.Text> {movies.Rating}</Card.Text>
                <Card.Text> {movies.Actors}</Card.Text> */}
                <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">Genre</Button>
                </Link>
              </Card.Body>
              <Button onClick={() => { onBackClick(null);}}> Back </Button>
            </Card>
        </Col>
      </Row>
    </Container>
    );
  }

 


}