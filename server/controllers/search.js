import Restaurant from "../models/Restaurant.js";

export const search = async(req, res) => {
  console.log('hello')
  try {
    let payload = req.body.payload.trim();
    // let search = await Restaurant.find( {$or:[ {name : {$regex : new RegExp('^'+payload+'.*','i')}}, {tags : {$regex : new RegExp('^'+payload+'.*','i')}}]}).exec();
    // search = search.slice(0, 8);
    // res.status(201).json(search);
    console.log('payload : ', payload)
  } catch (err) {
    console.log("yes : ",err.message)
    res.status(500).json({error: err.message})
  }
}