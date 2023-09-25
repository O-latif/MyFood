import Comment from "../models/Comment.js";

export const addCom = async(req, res) => {
  try {
    const {
      userId,
      userF,
      userL,
      resId,
      note,
      content
    } = req.body;

    const newCom = new Comment({
      userId,
      userF,
      userL,
      resId,
      note,
      content
    });
    const savedCom = await newCom.save();
    res.status(201).json(savedCom);
  } catch (err) {
    console.log('error : ',err.message)
    res.status(500).json({error: err.message})
  }
}

export const getCom = async (req, res) => {
  try {
    const com = await Comment.find();
    res.status(201).json(com);

  } catch (err) {
    console.log('error : ',err.message)
    res.status(500).json({error: err.message})
  }
}