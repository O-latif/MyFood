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
    const response = await fetch("https://myfood-54i9.onrender.com/resto", {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setRestos({restos : data}));
    
  };
  //  eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=> {getRestos()}, []);

  return <>
    <div id="carouselExampleAutoplaying" className= {is60 ? "carousel slide resize" : "carousel slide "} data-bs-ride="carousel">
      <div className= {is75 ? "carousel-indicators bot-100" : is60 ? "carousel-indicators bot-15" : "carousel-indicators"}>
        { restos.map((rest, i) => {
          if(i < 5) {
            return (
            <button key= {(rest._id).toString()} type="button" data-bs-target="#carouselExampleAutoplaying"  data-bs-slide-to={i} className={i === 0 ? "active" : ""} aria-current="true" aria-label={"Slide" + i} ></button>
            )
          }
          return <></>
        })}

      </div>

      <div className= {is60 ? "carousel-inner resize" : "carousel-inner"}>
        { restos.map((rest, i) => {
          if(i < 5 ) {
            return (
              <div 
                key={(rest._id).toString()}
                className= {i === 0 ? "carousel-item active" : "carousel-item"} 
                
                data-content={rest.name}
                onClick={() => window.location.href =`/restaurant/${rest._id}`}
                >
                  <img src={`https://myfood-54i9.onrender.com/assets/${rest.picturePath}`} className="d-block w-100" alt="..."  />
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