const mongoose = require("mongoose");
const app = require("express")();
const connection = (url) => {
  mongoose.connect(url);
  mongoose.connection.on("error", (error) => {
    console.error("Database connection error:", error);
  });
  mongoose.connection.once("open", () => {
    console.log("Connected to the database");
  });
};

const connect = (url) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url);
    mongoose.connection.on("error", (error) => {
      console.error("Database connection error:", error);
      reject(error);
    });
    mongoose.connection.once("open", () => {
      console.log("Connected to the database");
      resolve();
    });
  });
};
module.exports = connect;
