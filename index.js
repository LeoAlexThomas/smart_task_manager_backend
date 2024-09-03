const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 3002;

// 'app.use' => middleware to add api routes for our application
app.use("/api", require("./routes/taskRoutes"));

app.listen(port, () => {
  console.log("listening on port " + port);
});
