import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRestos } from "state";
import { useMediaQuery } from "@mui/material";
import '../../css/slider.css';


const Slider = () => {
  const is60 = useMediaQuery("(min-width:1000px)");
  const is75 = useMediaQuery("(min-width:1750px)");
  const dispatch = useDispatch();
  const restos = useSelector((state) => state.restos);
  // const token = useSelector((state) => state.token);

  const getRestos = async () => {
    const response = await fetch("/resto", {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setRestos({restos : data}));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=> {getRestos()}, []);
  return <>
    <div id="carouselExampleAutoplaying" className= {is60 ? "carousel slide resize" : "carousel slide "} data-bs-ride="carousel">
      <div className= {is75 ? "carousel-indicators bot-100" : is60 ? "carousel-indicators bot-15" : "carousel-indicators"}>
        { restos.map((rest, i) => {
          if(i < 5) {
            return (
            <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to={i} className={i === 0 ? "active" : ""} aria-current="true" aria-label={"Slide" + i} key={rest._id}></button>
            )
          }
          return <></>
        })}
        {/* <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button> */}
      </div>
      <div className= {is60 ? "carousel-inner resize" : "carousel-inner"}>
        { restos.map((rest, i) => {
          if(i < 5 ) {
            return (
              <div 
                className= {i === 0 ? "carousel-item active" : "carousel-item"} 
                key={rest._id}
                data-content={rest.name}
                onClick={() => window.location.href =`http://localhost:3000/restaurant/${rest._id}`}
                >
                  <img src={`/assets/${rest.picturePath}`} className="d-block w-100" alt="..."  />
                </div>
            )
          }
          return <></>
        })
        }
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </>
}

export default Slider;