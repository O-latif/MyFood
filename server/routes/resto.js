import express from "express";
import {getRestos, getResto, rateResto, getNewRestos} from "../controllers/resto.js";

const router = express.Router();


/* READ */
router.get("/", getRestos);
router.get("/:id", getResto);


/* UPDATE */
router.patch("/review/:id", rateResto);

export default router;