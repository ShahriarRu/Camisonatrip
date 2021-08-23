import React from "react";
import { Table } from "react-bootstrap";

const PhotoScore = ({ photo_score }) => {
  return (
    <div>
      <h1>Photo Score</h1>
      <Table striped bordered hover size="sm" variant="dark">
        <tbody>
          <tr>
            <th>Quality Score</th>
            <th>Quality Class</th>
            <th>Status</th>
          </tr>
          <tr>
            {photo_score ? (
              <>
                <td>{photo_score && photo_score.quality.score}</td>
                <td>{photo_score && photo_score.quality.class}</td>
                <td>{photo_score.status}</td>
              </>
            ) : (
              <td>
                <h4>No Score yet!</h4>
              </td>
            )}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default PhotoScore;
