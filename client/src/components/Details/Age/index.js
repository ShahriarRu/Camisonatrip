import React from "react";
import { Table } from "react-bootstrap";

const Age = () => {
  return (
    <div>
      <h1>Age</h1>
      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>Labels</th>
            <th>Text</th>
            <th>Age</th>
            <th>Emotion</th>
            <th>Age</th>
            <th>Photo Scoring</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Age;
