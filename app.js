var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var dotenv = require("dotenv");
dotenv.config();

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");

var port = process.env.PORT || 5000;
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", indexRouter);
app.use("/api/v1", authRouter);

// mongoDB setup
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("Database connection error");
});

db.on("open", () => {
  console.log("Database connected successfully");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
