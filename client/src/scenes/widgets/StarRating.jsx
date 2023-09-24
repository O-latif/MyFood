/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../../css/StarRating.css'
import { Box , Button, useTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setResto } from "state";

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const { palette } = useTheme();
  const resId = useSelector((state) => state.resto._id)
  
  
  const patchReview = async () => {
    const response = await fetch(`http://localhost:3002/resto/review/${resId}`, {
      method: "PATCH",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId , note : rating}),
    });
    const updatedResto = await response.json();
    dispatch(setResto({ resto: updatedResto }));
  };
  
  return(
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexWrap={'wrap'}
    >
      {[...Array(5)].map((star, i) => {
        const value = i + 1;
        return (
          
            <label key={i}>
              <input 
                type="radio" 
                name="rating" 
                value={value} 
                onClick={()=> setRating(value)} 
              />
              <FaStar 
                className="star" 
                size={100} 
                color={value <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                onMouseEnter={()=>setHover(value)} 
                onMouseLeave={()=>setHover(null)}
              />
            </label>
          )
      })
      }
      <textarea 
        name="review"
        id="review" 
        placeholder={'What Do You Think About This Restaurant ?'} 
        style={{
          width: '100%',
          height: '150px',
          padding: '12px 20px',
          boxSizing: 'border-box',
          border: '2px s,olid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f8f8f8',
          fontSize: '16px',
          resize: 'none',
          marginTop: '30px'
        }}
      />
      <Box>
        <Button
          fullWidth
          type="submit"
          sx={{
            m: "2rem 0",
            p: "1rem",
            backgroundColor: palette.primary.main,
            color: 'white',
            "&:hover": {backgroundColor: palette.primary.light },
          }}
          onClick={patchReview}
        >
          Submit
        </Button>
        
      </Box>
    </Box>
  )
}

export default StarRating;