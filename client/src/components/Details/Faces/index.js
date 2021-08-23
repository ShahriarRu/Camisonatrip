import React from "react";
import { Table } from "react-bootstrap";

const Faces = ({ faces, faces_image_url }) => {
  return (
    <>
      <h1>Faces</h1>
      <Table striped bordered hover size="sm" variant="dark">
        <tbody>
          {/* <td>{JSON.stringify(faces)}</td> */}
          {/* <td><img src={faces_image_url} alt="Faces" /></td> */}

          {/* <div>{JSON.stringify(faces)}</div> */}

          {faces_image_url ? (
            <>
              <tr>
                {/* <td>{JSON.stringify(face)}</td> */}
                <td>#</td>
                <td>Joy</td>
                <td>Anger</td>
                <td>Sorrow</td>
                <td>Surprise</td>
              </tr>
              {faces.map((face, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{face.joyLikelihood}</td>
                    <td>{face.angerLikelihood}</td>
                    <td>{face.sorrowLikelihood}</td>
                    <td>{face.surpriseLikelihood}</td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <td>
                <h4>No face image found</h4>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {faces_image_url && (
        <img
          // src="https://storage.googleapis.com/gwb-group.appspot.com/02-still-for-america-room-loop-superJumbo.jpg?GoogleAccessId=proayaz%40gwb-group.iam.gserviceaccount.com&Expires=16446999600&Signature=gbL6I7F%2BihFBsF6YJOISfnZJUxBFF3TqmsKC4WB1nu9VFCuuhkQFtjVy1SQyFwFcFviACFxZ590p0biYBTLQmY5YIb0XCM0SJCYV3MNCB2%2F%2FcJHIhb4qkiM5fuJR5WvuLeBlJlUGBGmPoq3rc9Gjb%2Bwn57DTKZEHFwJ3EyiTP8DkoJsts4GXEwBsCeh6CnmGK58mZA5r%2FHXoAqz2PUvEfgRubgMpX%2F%2B3GaOEkA5oBfuV08m5%2FK%2BrunJdaKG9ipcf4g2UgAFonrqJjOHOKvTmp0T%2FJ%2FUHSka%2FAlKYMZCa%2F4CAOJmaiDLii2KqSkPdspsRlaxANUi6lHBGPamghYCuaA%3D%3D"
          src={faces_image_url}
          style={{
            maxWidth: "100%",
          }}
          alt="Faces"
        />
      )}
    </>
  );
};

export default Faces;
