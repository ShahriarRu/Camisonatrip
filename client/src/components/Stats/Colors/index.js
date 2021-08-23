import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import rgbHex from "rgb-hex";

const Properties = ({ colors }) => {
  const showColors = (color, i) => {
    let backColor =
      `#` + rgbHex(color.color.red, color.color.green, color.color.blue);

    return (
      <tr key={i}>
        <td>
          <div
            style={{
              backgroundColor: backColor,
              color: "red",
              // height: "31px",
              minHeight: "31px",
              textAlign: "center",
            }}
          ></div>
        </td>
        <td>#{rgbHex(color.color.red, color.color.green, color.color.blue)}</td>
        <td>{parseFloat(color.percent).toFixed(2)}%</td>
      </tr>
    );
  };

  return (
    <div>
      <h1>Color properties</h1>
      <Table striped bordered hover size="sm" variant="dark">
        <tbody>
          <tr>
            <th>Color</th>
            <th>Hex Value</th>
          </tr>
          {colors.length !== 0 ? (
            colors.map((color, i) => showColors(color, i))
          ) : (
            <tr>
              <td>
                <h4>No Colors found</h4>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = ({ stats }) => {
  const { colors } = stats;
  return { colors };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
