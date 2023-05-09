import {Link} from 'react-router-dom';
import "../../CSS/ProductCars.css";
import {React,useState} from 'react';
import CountdownTimer from "./CountdownTimer";
const ProductCards = (props) =>{ 
    return (      
    <div className="card">
      <img className="product--image" src={props.image} alt="product image" />
      <h2>{props.name}</h2>      
      <CountdownTimer endTime={props.end_date} />
      <p>{props.description}</p>
      <p>
      <Link
        to={"" + props.auction_id}
       className="btn btn-dark w-50">
       bid
      </Link>
      </p>
    </div>
  
      );
};

export default ProductCards;