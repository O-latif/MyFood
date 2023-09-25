import express from "express";
import { addCom, getCom } from "../controllers/comment.js";

const router = express.Router();

// post comment
router.post('/comment', addCom);
router.get('/comments', getCom);

export default router;