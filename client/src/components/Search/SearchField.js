import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

const SearchField = ({
  labels,
  setLabels,
  texts,
  setTexts,
  objects,
  setObjects,
  photoScore,
  setphotoScore,
  faces,
  setFaces,

  // search
  search,
  setSearch,

  // handleKeyup
  handleKeyUp,

  // handleButton
  handleButton,
}) => {
  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col>
            <InputGroup>
              <FormControl
                id="inlineFormInputGroup"
                placeholder="Search ..."
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={handleKeyUp}
                autoFocus={true}
                value={search}
              />
              <InputGroup.Text
                onClick={handleButton}
                style={{
                  cursor: "pointer",
                }}
              >
                <BsSearch />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mt-3">
              <Form.Check
                inline
                type="checkbox"
                label="Labels"
                checked={labels}
                value={labels}
                onChange={(e) => setLabels(e.target.checked)}
              />
              <Form.Check
                inline
                type="checkbox"
                label="Texts"
                checked={texts}
                value={texts}
                onChange={(e) => setTexts(e.target.checked)}
              />
              {/* <Form.Check inline type="checkbox" label="Color Properties" /> */}
              <Form.Check
                inline
                type="checkbox"
                label="Faces"
                checked={faces}
                value={faces}
                onChange={(e) => setFaces(e.target.checked)}
              />
              <Form.Check
                inline
                type="checkbox"
                label="Objects"
                checked={objects}
                value={objects}
                onChange={(e) => setObjects(e.target.checked)}
              />

              <Form.Label className="mr-3">Photo Score</Form.Label>

              <select
                type="select"
                value={photoScore}
                onChange={(e) => setphotoScore(e.target.value)}
              >
                {/* <option disabled value="0" hidden>
                  Select photo score
                </option> */}
                <option value="1">0 - 20</option>
                <option value="2">20 - 40</option>
                <option value="3">40 - 60</option>
                <option value="4">60 - 80</option>
                <option value="5">80 - 100</option>
              </select>

              {/* <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select> */}
              {/* <Form.Check
                inline
                type="checkbox"
                label="Photo Score"
                checked={photoScore}
                value={photoScore}
                onChange={(e) => setphotoScore(e.target.checked)}
              /> */}
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchField;
