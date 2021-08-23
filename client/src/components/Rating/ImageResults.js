import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Card from "./Card";

const ImageResults = ({ results }) => {
  return (
    <Container>
      <Row>
        <Col>
          {results.map((result, i) => (
            <Card data={result} key={i} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ImageResults;
