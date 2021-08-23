const express = require("express");
const dotenv = require("dotenv");

const statsRoute = require("./routes/stats");
const path = require("path");
//dotenv config
dotenv.config();

const app = express();
app.use(express.json());

// production
// app.use(express.static(path.join(__dirname, "build")));

//Creating API for user
app.use("/api/stats", statsRoute);

// app.get("/", (req, res) => {
//   res.send("API for Image stats");
// });

const PORT = process.env.PORT || 5000;

//Express js listen method to run project on http://localhost:5000

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
