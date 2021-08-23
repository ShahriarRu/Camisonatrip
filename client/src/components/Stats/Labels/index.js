import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

const Labels = ({ labels }) => {
  // useEffect(() => {
  //   getLabelsAction("some url");
  // }, []);

  // useEffect(() => {
  //   console.log("Labels in Labels", labels);
  // }, []);

  return (
    <div>
      <h1>Labels</h1>
      <Table striped bordered hover size="sm" variant="dark">
        <tbody>
          <tr>
            <th>Labels</th>
            <th>Score</th>
          </tr>
          {labels.length !== 0 ? (
            labels.map((label, i) => (
              <tr key={i}>
                <td>{label.description}</td>
                <td>{label.score * 100}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <h4>No Labels found</h4>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = ({ stats }) => {
  const { labels } = stats;
  return { labels };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Labels);
