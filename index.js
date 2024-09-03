const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/connectDB");

// NOTE: Initiate the connection to database
connectDB();

const app = express();

const port = process.env.PORT || 3002;

// 'app.use' => middleware
// Below line gives parser to help with data string parsed from client side on server side [get access to Request Body]
app.use(express.json());
// To add api routes for our application
app.use("/api", require("./routes/taskRoutes"));
// To add error handlers for structured error messages
app.use(errorHandler);

app.listen(port, () => {
  console.log("listening on port " + port);
});
