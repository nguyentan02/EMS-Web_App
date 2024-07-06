const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

// Pulbic
app.use("/public", express.static(path.join(__dirname, "/v1/public")));

// cors
app.use(cors());
// add body-parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

//router
app.use("/api", require("./v1/routes/index.router"));

module.exports = app;
