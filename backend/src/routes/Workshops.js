const express = require("express");
const {
  LIST,
  CREATE,
  UPDATE,
  DELETE,
} = require("../controllers/ModelController");
const WorkshopModel = require("../models/Workshops");

const router = express.Router();

router.get("/", LIST(WorkshopModel));
router.post("/", CREATE(WorkshopModel));
router.patch("/", UPDATE(WorkshopModel));
router.delete("/", DELETE(WorkshopModel));

module.exports = router;
