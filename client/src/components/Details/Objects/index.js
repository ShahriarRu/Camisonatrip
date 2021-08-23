import React from "react";
import { Table } from "react-bootstrap";

const Objects = ({ objects }) => {
  return (
    <div>
      <h1>Objects</h1>
      {/* <div>{objects.length !== 0 && JSON.stringify(objects)}</div> */}
      <Table striped bordered hover size="sm" variant="dark">
        <tbody>
          <tr>
            <th>Objects</th>
            <th>Score</th>
          </tr>
          {objects.length !== 0 ? (
            objects.map((object, i) => (
              <tr key={i}>
                <td>{object.name}</td>
                <td>{object.score * 100}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <h4>No objects found</h4>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Objects;
