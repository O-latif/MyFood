/* eslint-disable no-unused-vars */
import { Box , Typography, useMediaQuery, useTheme, Divider, Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import NavBar from "scenes/navBar";
import '../../css/restaurant.css'
import React, { useState, useEffect } from 'react'
import {useSelector , useDispatch } from "react-redux";
import { setResto } from "state";
import { FaStar } from 'react-icons/fa';
import '../../css/StarRating.css';
import { useNavigate } from "react-router-dom";
import Footer from "scenes/footer";
import {Helmet, HelmetProvider} from "react-helmet-async";




const images = [
  { src: 'http://localhost:3002/assets/pirata-studio-film-qt6b5042lrw-unsplash.jpg', alt: 'Image 1' },
  { src: 'http://localhost:3002/assets/pirata-studio-film-qt6b5042lrw-unsplash.jpg', alt: 'Image 2' },
  { src: 'http://localhost:3002/assets/pirata-studio-film-qt6b5042lrw-unsplash.jpg', alt: 'Image 3' },
  { src: 'http://localhost:3002/assets/pirata-studio-film-qt6b5042lrw-unsplash.jpg', alt: 'Image 4' },
  { src: 'http://localhost:3002/assets/pirata-studio-film-qt6b5042lrw-unsplash.jpg', alt: 'Image 5' },
  { src: 'http://localhost:3002/assets/pirata-studio-film-qt6b5042lrw-unsplash.jpg', alt: 'Image 6' },
  { src: 'http://localhost:3002/assets/pirata-studio-film-qt6b5042lrw-unsplash.jpg', alt: 'Image 7' },
];

const Restaurant = () =>  {
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const [toggle, setToggle] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const resto = useSelector((state) => state.resto);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");


  const [rating, setRating] = useState(0);
  const [note, setNote] = useState(0);
  const [review, setReview] = useState('');
  const [hover, setHover] = useState(0);
  const [isIt, setIsIt] = useState(false);
  const [commented, setCommented] = useState(false);
  const [allComments, setAllComments] = useState([]);

  let userComments = [];
  let link = '';
  // let allComments = [];
  // const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const userF = useSelector((state) => state.user.firstName);
  const userL = useSelector((state) => state.user.lastName);
  const restos = useSelector((state) => state.restos);

  const restoId = window.location.pathname.split("/")[2];

  const handleMessageChange = event => {
    // 👇️ access textarea value
    setReview(event.target.value);
  };

  const getResto = async () => {
    const response = await fetch(`http://localhost:3002/resto/${restoId}`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(
      setResto({
        resto: data,
      })
    );
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=> {getResto()}, []);
  
  const patchReview = async () => {
    const response = await fetch(`http://localhost:3002/resto/review/${restoId}`, {
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

  

  const postCom = async () => {
    const response = await fetch(`http://localhost:3002/com/comment`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId ,userF ,userL, resId: restoId, note : rating, content: review }),
    });
    const updatedCom = await response.json();
    setIsIt(true);
  };
  const getUserCom = (item) => {
    if(item.userId === loggedInUserId && item.resId === restoId) return item
  }
  const getRestoCom = (item) => {
    if(item.resId === restoId) return item
  }
  const nearby = (item) => {
    if(item.city === resto.city && item._id !== resto._id) return item
  }
  const getCom = async () => {
    const response = await fetch(`http://localhost:3002/com/comments`, {
      method: "GET",
    });
    const data = await response.json();
    setAllComments( arr => data.filter(getRestoCom));
    userComments = data.filter(getUserCom);
    userComments.length > 0 ? setNote(userComments[0].note) : console.log();
    data.filter(getUserCom).length > 0 ? setCommented(true) : setCommented(false);
  };

  const func =async () => {
    getCom();

    if(!commented) {
      patchReview();
      postCom();
      
    }
    // window.location.reload(false);
  }
  // console.log(restoId.resId)
  
  let end;
  isNonMobile ? (end = 2) : (end = 1)
  useEffect(() => {
    getCom();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  // console.log('all2 : ', allComments.length);
  
  return <Box>
    <HelmetProvider>
      <Helmet>
          <title>MyFood | {resto.name} </title>
      </Helmet>
    </HelmetProvider>
    {
      toggle && (
        <Box
          id={"crslBox"}
          width={'100%'}
          height={'100vh'}
          bgcolor={'black'}
          position={'sticky'}
          top={'0'}
          right={'0'}
          zIndex={'10'}
          // display={'none'}
        >
          <CloseIcon sx={{color : 'red',position:'absolute', right : '0', zIndex : '2', m: '5px' ,fontSize: '30px', cursor: 'pointer'}} onClick={() => setToggle(!toggle)}/>
          <div id="carouselExampleIndicators" className="carousel slide "  height={'100vh'}>
            <div className= "carousel-indicators">
              { images.map((img, i) => (
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i} className={i === 0 ? "active" : ""} aria-current="true" aria-label={"Slide" + i} key={i}></button>
              ))}
              {/* <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button> */}
            </div>
            <div className= "carousel-inner ">
              { images.map((img, indx) => (
                      <div 
                      className= {indx === 0 ? "carousel-item active flx" : "carousel-item flx"} 
                      key={indx}
                      >
                        <img src = {img.src} alt = {img.alt} key={indx} width={'70%'} m={'0 auto'} /> 
                      </div>
                    ))
              }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </Box>
      )
    }
    <NavBar/>
    <Box 
      display={'flex'} 
      gap={'2px'} 
      alignItems={'center'}
      width= '100%'
      margin={'0 auto'}
      >
      {images.map((img, indx) => (
        
        <div className= {indx === end ? 'last' : indx > end ? 'nothing' : ''} data-content={`+${(images.length)-(end)}` } height={'50vh'} key={indx} >
          <img src = {img.src} alt = {img.alt} key={indx} width={'100%'} height={'100%'}  />
          {(indx === end) && (
            <span   
              className="span"          
              onClick={ () => {indx === end ? setToggle(!toggle) : console.log('')}}
            >
              {`+${(images.length)-(end)}` }
            </span>
          )}
        </div>
      ))}
    </Box>
    
    <Box 
      width={isNonMobileScreens ? '80%' : '95%'}
      m={'0 auto'}
      display={isNonMobileScreens ? 'block' : 'flex'}
      justifyContent={'center'}
      flexWrap={'wrap'}
    >
      <Box width={'100%'} display={isNonMobileScreens ? 'block' : 'flex'}
      alignItems={'center'}
      flexWrap={'wrap'}
      flexDirection={"column"}
      >
        <Typography
          variant="h2" 
          mt={'50px'} 
          fontWeight={'bold'} 
          fontSize = '36px'
          fontFamily = '"AvenirNext-DemiBold", "Helvetica Neue Medium", sans-serif'
          marginBottom = '13px'
          lineHeight = '1'
          >
          {resto.name}
        </Typography>
        <Typography
          color={palette.neutral.mediumMain} 
          variant="h6"
        >
          {resto.address}
        </Typography>
        <Box mb={'20px'} mt={'10px'}>
          {(resto.tags).map((tag, index) => (
            <div className="tag" key={index} style={{margin : 0}}>
              {tag}
            </div>
          ))}
        </Box>
      </Box>
      <hr width={'80%'}/>
      <Typography variant="h2" m={'20px 0'} textAlign={isNonMobileScreens ? 'left' : 'center'}>
        MyFood’s Point Of View
      </Typography>
      <Typography
        width={'80%'}
        fontSize={'18px'}
        lineHeight={'1.5'}
        color={palette.neutral.mediumMain}
        textAlign={isNonMobileScreens ? 'left' : 'center'}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Eum eos et officiis, delectus saepe qui perferendis ab distinctio repellat accusamus
        harum reprehenderit ea ratione sapiente dolore quaerat blanditiis!
      </Typography>
      <hr width={'80%'}/>
      <Typography variant="h2" m={'20px 0'} textAlign={isNonMobileScreens ? 'left' : 'center'}>
        Tell Us What You Think about " {resto.name} "
      </Typography>
      { !isIt && !commented ? (
        <>
          <Box
            display={'flex'}
            justifyContent={'center'}
            m={'10px 0'}
          >
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
                      size={isNonMobileScreens ? 100 : 50} 
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
              value={review}
              onChange={handleMessageChange}
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
                onClick={()=> func()}
              >
                Submit
              </Button>
              
            </Box>
          </Box>
          </Box>
        </>
      ) : (
        <Typography
          variant="h2"
          fontWeight={'bold'}
          fontSize={'25px'}
          width={'100%'}
          textAlign={'center'}
          m={'40px 0'}
        >
          <Typography 
            fontSize={'30px'} mb={'20px'}
            textAlign={'center'}
          >
            🖤 Thank You For Sharing Your Review With Us 🖤
          </Typography>

          {
            note >= 1 ? (
              [...Array(5)].map((star, i) => {
                const value = i + 1;
                return (
                  
                    <label key={i}>
                      <input 
                        type="radio" 
                        disabled
                        name="rating" 
                        value={rating} 
                        
                      />
                      <FaStar 
                        className="star" 
                        size={isNonMobileScreens ? 100 : 50} 
                        color={value <= (note) ? '#ffc107' : '#e4e5e9'}
                        onMouseEnter={()=>setHover(value)} 
                        onMouseLeave={()=>setHover(null)}
                      />
                    </label>
                  )
              })
              
            ) : (
              <></>
            )
          }
        </Typography>
      )

      }
      <hr width={'80%'}/>
      <Typography variant="h2" m={'20px 0'} textAlign={isNonMobileScreens ? 'left' : 'center'}>
        What MyFood visitors said about " {resto.name} "
      </Typography>
      <Box mt="0.5rem" width={isNonMobileScreens ? '50%' : '100%'}>
        {/* {console.log('all : ', allComments.length)} */}
          {allComments.map((com , i) => (
            
            <Box key={i} ml={'10px'}>
              <Box
                display={'flex'}
                gap={'20px'}
                m={'20px 0'}
              >
                <Box 
                  borderRadius={'50%'} 
                  width={'50px'} 
                  height={'50px'} 
                  border={'1px solid black'} 
                  fontSize={'20px'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bgcolor={'olivedrab'}
                  color={'white'}
                >
                  {com.userF[0]}{com.userL[0]}
                </Box>
                <Box>
                  <Typography variant="h4">{com.userF} {com.userL}</Typography>
                  <Typography m={'3px 0 0 10px'}>
                    {com.content}
                  </Typography>
                </Box>
              </Box>
              <Divider/>
            </Box>
            
          ))}
            
          
      </Box>
      
      <Typography
        variant="h2" 
        m={'20px 0'}
        className="uper"
        margin={'0 auto'}
        textAlign={isNonMobileScreens ? 'left' : 'center'}
      >
        Nearby Restaurants
      </Typography>
      <Box width={'100%'} mt={'40px'}>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {restos.filter(nearby).map((r, i) => (
            <div className="col" key={i}>
              <Typography display={'none'}>{ link = '/assets/' + r.picturePath  }</Typography>
              <div className="card">
                <img src={link} className="card-img-top" alt={r.name} height={'200px'}/>
                <Box className="card-body" bgcolor={palette.background.alt} color={palette.neutral.nav}>
                  <h5 className="card-title"> {r.name} </h5>
                  <p className="card-text"> {r.city} </p>
                  <Box mb={'20px'} mt={'10px'}>
                    {(r.tags).map((tag, index) => (
                      <div className="tag" key={index}>
                        {tag}
                      </div>
                    ))}
                  </Box>
                </Box>
              </div>
          </div>
          )) }
          
        </div>
      </Box>
    </Box>
    {/* Restaurant Owner  */}
    <Box mt={'50px'} bgcolor={palette.background.alt} p={'50px 0'} textAlign={'center'} color={palette.neutral.nav}>
        <Typography variant="h1" fontWeight={'bold'}>
          Are You A Restaurant Owner ?
        </Typography>
        <Button 
        type="submit"
          sx={{
            m: "2rem 0",
            p: "1rem",
            backgroundColor: palette.primary.main,
            color: "white",
            "&:hover": {backgroundColor: palette.primary.light },
          }}
          onClick={() => navigate("/addRestaurant") }
        > Add A Restaurant </Button>
      </Box>
    <Footer/>
  </Box>
}

export default Restaurant;