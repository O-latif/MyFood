import express from "express";
import {getRestos, getResto, rateResto} from "../controllers/resto.js";
import { search } from "../controllers/search.js";

const router = express.Router();


/* READ */
router.get("/", getRestos);
router.get("/:id", getResto);
router.post("/sear", search);


/* UPDATE */
router.patch("/review/:id", rateResto);

export default router;