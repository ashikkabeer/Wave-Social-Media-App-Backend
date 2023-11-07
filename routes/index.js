const express = require("express");
const router = express.Router();
let session = require("express-session");

const College = require("../schema/college");
const { default: mongoose } = require("mongoose");

module.exports = router;
