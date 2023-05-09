import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getAuthUser } from '../../helper/storage'; 
import {  Card } from 'react-bootstrap';



function BidForm() {
  const auction_id = useParams();
  const auth = getAuthUser(); 
  console.log(auth[0].type);

  const [bid_price, setBidPrice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/auctions/${auction_id.id}/bid`,
        { bid_price: bid_price }, {
          headers: {
             token: auth[0].token,
           },
         }
      );
      
      alert(response.data.msg);

      console.log(response.data);
      // do something with the response
    } catch (error) {
      alert(error.response.data.msg);
      console.log(error.response.data);
      // handle error
    }
  };

  return (
    <Card style={{margin:'10rem' , marginLeft:'33rem', width:'25rem'}}>
    <form onSubmit={handleSubmit} style={{margin:'10px'}}>
      <div>
        <label
         htmlFor="bidPrice">Bid Price:</label>
        <input  style={{margin:'10px'}}    
          type="number"
          id="bidPrice"
          value={bid_price}
          onChange={(event) => setBidPrice(event.target.value)}
        />
      </div>
      <button className='btn btn-dark ' type="submit">Submit Bid</button>
    </form>
    </Card>
  );
}

export default BidForm;