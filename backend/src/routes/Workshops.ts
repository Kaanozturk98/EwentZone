import express from "express";
import { LIST, CREATE, UPDATE, DELETE } from "../controllers/ModelController";
import WorkshopModel from "../models/Workshops";

const router = express.Router();

router.get("/", LIST(WorkshopModel));
router.post("/", CREATE(WorkshopModel));
router.patch("/", UPDATE(WorkshopModel));
router.delete("/", DELETE(WorkshopModel));

module.exports = router;
