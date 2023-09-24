import express from "express";
import {getWilayas, getWilayaRestos} from "../controllers/wilaya.js";

const router = express.Router();


/* READ */
router.get("/", getWilayas);
router.get("/:name", getWilayaRestos);

export default router;