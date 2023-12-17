var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
let session = require("express-session");
var logger = require("morgan");

// var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRoutes");
var postRouter = require("./routes/postRoutes");
var collegeRouter = require("./routes/collegeRoutes");

var app = express();
const connect = require("./db/connect");
require("dotenv").config();
const url = process.env.MONGO_URI;
const generateSecretKey = require("./helpers/crypto");
const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(
  session({
    secret: "7pqBM6ZHunRpuJ747fKUjRDlM+meUnnX3AlCWNpQgBM=",
    saveUninitialized: true,
    cookie: { maxAge: oneDay, secure: false },
    resave: false,
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", collegeRouter);
app.use("/", usersRouter);
app.use("/", postRouter);

app.use((req, res, next) => {
  res.status(404).render("error", {
    pageTitle: "404 Not Found",
    errorMessage: "Page not found.",
  });
});

// Error route
app.get("/error", (req, res) => {
  res.status(500).render("error", {
    pageTitle: "Error",
    errorMessage: "An error occurred!",
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
let PORT = process.env.PORT || 5000;
const start = async (url) => {
  try {
    await connect(url);
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(error);
  }
};
start(url);
module.exports = app;
