const express = require("express");
const app = express();
// const helmet = require('helmet')
// const morgan = require('morgan')
// const compression = require('compression')
// const ApiError = require("./v1/utils/apiError");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

// Pulbic
app.use("/public", express.static(path.join(__dirname, "/v1/public")));

// cors
app.use(cors());

//user middleware
// app.use(helmet())

// compress responses
// app.use(compression())

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

// Error Handling Middleware called

// app.use((req, res, next) => {
//     next(new ApiError(404, "error", "No Found", null))
// });

// error handler middleware
// app.use((error, req, res, next) => {
//     return res.status(error.code || 500).json({
//         code: error.code || 500,
//         status: error.status,
//         message: error.message || "Internal Server Error",
//         data: error.data,
//     });
// });

module.exports = app;
