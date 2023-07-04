require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const api = require("./api");
const app = express();
const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", api);

// Database Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Database Connected`);
  })
  .catch((err) => {
    console.log(`Database Connection Failed: ${err}`);
  })
  .finally(() => {
    mongoose.connection.useDb("AtlasMadness");
    app.listen(PORT, () => {
      console.log("== Server is running on port ", PORT);
    });
  });

app.use("*", function (req, res, next) {
  res.status(404).json({
    error: "Requested resource " + req.originalUrl + " does not exist",
  });
});

/*
 * This route will catch any errors thrown from our API endpoints and return
 * a response with a 500 status to the client.
 */
app.use("*", function (err, req, res, next) {
  console.error("== Error:", err);
  res.status(500).send({
    err: "Server error.  Please try again later.",
  });
});

exports.soundconductor = app;
