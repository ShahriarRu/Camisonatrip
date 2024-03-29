const fs = require("fs");
const request = require("request");

const download = (url, dest, cb) => {
  const file = fs.createWriteStream(dest);
  const sendReq = request.get(url);

  // verify response code
  sendReq.on("response", (response) => {
    if (response.statusCode !== 200) {
      console.log("Response status was " + response.statusCode);
    }
    sendReq.pipe(file);
  });

  // close() is async, call cb after close completes
  file.on("finish", () => file.close(cb));

  // check for request errors
  sendReq.on("error", (err) => {
    fs.unlink(dest);
    console.log(err.message);
  });

  file.on("error", (err) => {
    // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    console.log(err.message);
  });
};

module.exports = download;
