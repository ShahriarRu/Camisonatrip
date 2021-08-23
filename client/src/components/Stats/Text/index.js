import React from "react";
import { Table } from "react-bootstrap";

import { connect } from "react-redux";

const Texts = ({ texts, texts_image_url }) => {
  return (
    <div className="mt-3">
      <h1>Texts</h1>
      <Table striped bordered hover size="sm" variant="dark">
        <tbody>
          {texts.length !== 0 ? (
            <>
              {texts.map((text, i) => (
                <tr key={i}>
                  <td>{text.description}</td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td>
                <h4>No Texts found</h4>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {texts_image_url && (
        <img
          // src="https://storage.googleapis.com/gwb-group.appspot.com/02-still-for-america-room-loop-superJumbo.jpg?GoogleAccessId=proayaz%40gwb-group.iam.gserviceaccount.com&Expires=16446999600&Signature=gbL6I7F%2BihFBsF6YJOISfnZJUxBFF3TqmsKC4WB1nu9VFCuuhkQFtjVy1SQyFwFcFviACFxZ590p0biYBTLQmY5YIb0XCM0SJCYV3MNCB2%2F%2FcJHIhb4qkiM5fuJR5WvuLeBlJlUGBGmPoq3rc9Gjb%2Bwn57DTKZEHFwJ3EyiTP8DkoJsts4GXEwBsCeh6CnmGK58mZA5r%2FHXoAqz2PUvEfgRubgMpX%2F%2B3GaOEkA5oBfuV08m5%2FK%2BrunJdaKG9ipcf4g2UgAFonrqJjOHOKvTmp0T%2FJ%2FUHSka%2FAlKYMZCa%2F4CAOJmaiDLii2KqSkPdspsRlaxANUi6lHBGPamghYCuaA%3D%3D"
          src={texts_image_url}
          style={{
            maxWidth: "100%",
          }}
          alt="Text Image"
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ stats }) => {
  const { texts, texts_image_url } = stats;
  return { texts, texts_image_url };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Texts);
