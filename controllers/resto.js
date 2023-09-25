import Restaurant from "../models/Restaurant.js";


/* ADD RESTAURANT */
export const addResto = async(req, res) => {
  try {
    const {
      name,
      address,
      city,
      phone,
      minPrice,
      picturePath,
      tags,
      description,
      contactFirstName,
      contactLastName,
      contactEmail,
      contactPhone
    } = req.body;
    
    const newRestaurant = new Restaurant({
      name,
      address,
      city,
      phone,
      minPrice,
      picturePath,
      resNote : 0,
      reviews : 0,
      moyen : 0,
      tags,
      description,
      contactFirstName,
      contactLastName,
      contactEmail,
      contactPhone
    });
    const savedResto = await newRestaurant.save();
    res.status(201).json(savedResto);

  } catch (err) {
    console.log(err.message)
    res.status(500).json({error: err.message})
    }
};

/* Get Restaurants */
export const getRestos = async (req, res) => {
  try {
    
    const restos = await Restaurant.find().sort({"moyen":-1});
    res.status(201).json(restos);
  } catch (err) {
    res.status(404).json({message : err.message});
  }
}

/* Get New Restaurants */
export const getNewRestos = async (req, res) => {
  try {
    console.log('here : ')
    const restos = await Restaurant.find().sort({"createdAt":-1});
    console.log('resto : ',restos.length)
    res.status(201).json(restos);
  } catch (err) {
    console.log('err : ', err.message)
    res.status(404).json({message : err.message});
  }
}

/* GET RETAURANT */
export const getResto = async (req,res) => {
  try {
    
    const { id } = req.params;
    const resto = await Restaurant.findById(id);
    
    res.status(201).json(resto);
  } catch (err) {
    res.status(404).json({message : err.message});
  }
}

/* UPDATE */
export const rateResto = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const resto = await Restaurant.findById(id);
    // const isReviewed = resto.usersReviewed.get(userId);
    let isReviewed = false;
    for (let i = 0; i < resto.usersReviewed.length; i++) {
      if(resto.usersReviewed[i].match(userId)) isReviewed = true;
    }
    let resNot, review, avrg;
    const note = req.body.note;
    console.log('note : ', note);
    

    if (isReviewed) {
      resNot = resto.resNote;
      review = resto.reviews;
      avrg = resto.moyen;
      
    } else {
      resto.usersReviewed.push(userId);
      resNot = resto.resNote + note;
      
      review = resto.reviews + 1;
      
      avrg = resNot / review;
    console.log('resnote : ', resNot);
    console.log('reviews : ', review);
    console.log('moyen : ', avrg);
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
        { $set:
          {
            usersReviewed: resto.usersReviewed,
            resNote: resNot,
            reviews: review,
            moyen : avrg
          }
        }
    );
    res.status(200).json(updatedRestaurant);

    }
    
  } catch (err) {
    console.log(err.message)
    res.status(404).json({ message: err.message });
  }
};