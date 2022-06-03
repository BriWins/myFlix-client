import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Container, Row } from "react-bootstrap/";

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
 
    return (
      <Container className="director-view">
        <Row>
          <Col className="label">Director: </Col>
          <Col className="value">{director.Name}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Bio: </Col>
          <Col className="value">{director.Biography}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Date of Birth: </Col>
          <Col className="value">{director.Birthdate}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Birthplace: </Col>
          <Col className="value">{director.Birthplace}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Deathplace: </Col>
          <Col className="value">{director.Deathplace}</Col>
        </Row>
        <Button className="d-block mt-3" onClick={() => { onBackClick(null); }} variant="warning">Back</Button>
      </Container>
    )
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Biography: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired,
    Birthplace: PropTypes.string.isRequired,
    Deathplace: PropTypes.string
  }).isRequired
};
