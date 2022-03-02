/**
 * Auth Router path for backend.
 *
 */

const express = require("express");
const User = require("../models/User");
const {
  LIST,
  CREATE,
  DELETE,
  UPDATE,
} = require("../controllers/ModelController");
const router = express.Router();

router.get("/", LIST(User));
router.post("/", CREATE(User));
router.patch("/", UPDATE(User));
router.post("/delete", DELETE(User));

module.exports = router;
