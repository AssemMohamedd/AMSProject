import Table from 'react-bootstrap/Table'; 
import React, {useState , useEffect} from 'react'; 
import axios from 'axios'; 
import { getAuthUser } from '../../helper/storage'; 
const Auctionhistory=()=> 
{ 
 
  const auth = getAuthUser();
  const id = auth[0].user_id; 
  const [AuctionHistory, setAuctionhistory] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setAuctionhistory({ ...AuctionHistory, loading: true });
    axios
      .get(`http://localhost:4000/auctions/${id}/winner`) //bdl el 21 nhot auth.id
      .then((resp) => {
        setAuctionhistory({ ...AuctionHistory, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setAuctionhistory({
          ...AuctionHistory,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [AuctionHistory.reload]);
 
  
  return ( 
    
    <>  
      <Table striped bordered hover className="my-table"> 
      
        <thead> 
          <tr> 
          <th> Bidder ID</th> 
          <th>Auction ID</th> 
          <th> Bid Price</th> 
          <th> bid datetime</th> 
          <th> status</th> 
          <th> Image</th> 

 
          </tr> 
        </thead> 
        <tbody> 
             
          {AuctionHistory.results 
            .map((Auctionhistory) => ( 
              <tr key={Auctionhistory}> 
                <td> {Auctionhistory.bidder_id} </td> 
                <td> {Auctionhistory.auction_id}</td> 
                <td> {Auctionhistory.bid_price}</td> 
                <td> {Auctionhistory.bid_datetime}</td>
                <td> {Auctionhistory.winner_status}</td> 
                <td> <img  src={Auctionhistory.image_url} style={{width:'15%'}} /> </td> 
              </tr> 
            ))} 


        </tbody> 
      </Table> 
    </> 
  ); 
}; 
 
export default Auctionhistory;


