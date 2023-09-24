import Restaurant from '../models/Restaurant.js';
import Wilaya from '../models/Wilaya.js';


/* Get Wilayas */
export const getWilayas = async (req, res) => {
  try {
    
    const wilayas = await Wilaya.find();
    res.status(201).json(wilayas);
  } catch (err) {
    res.status(404).json({message : err.message});
  }
}

/* Get Wilaya restos*/
export const getWilayaRestos = async (req, res) => {
  try {
    let { name } = req.params;
    name = name.charAt(0).toUpperCase() + name.slice(1);

    const restos =await Restaurant.find({city : name});
    res.status(201).json(restos);
  } catch (err) {
    console.log('err : ',err.message)
    res.status(404).json({message : err.message});
  }
}