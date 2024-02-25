import express from "express";
import {getRestos, getResto, rateResto} from "../controllers/resto.js";

import Restaurant from "../models/Restaurant.js";

const router = express.Router();


/* READ */
router.get("/", getRestos);
router.get("/:id", getResto);
router.post("/sear",async (req, res) => {
  console.log('hello')
  try {
    let payload = req.body.payload.trim();
    console.log('payload : ', payload)
    let search = await Restaurant.find( {$or:[ {name : {$regex : new RegExp('^'+payload+'.*','i')}}, {tags : {$regex : new RegExp('^'+payload+'.*','i')}}]}).exec();
    search = search.slice(0, 8);
    console.log('result : ', search)
    res.status(201).json(search);
    
  } catch (err) {
    console.log("yes : ",err.message)
    res.status(500).json({error: err.message})
  }
});


/* UPDATE */
router.patch("/review/:id", rateResto);

export default router;