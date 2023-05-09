import Table from 'react-bootstrap/Table'; 
import React, {useState , useEffect} from 'react'; 
import axios from 'axios'; 
import { getAuthUser } from '../../helper/storage'; 
const viewhistory =()=> 
{ 
  const auth = getAuthUser(); 
  const id = auth[0].user_id; 

 
  // eslint-disable-next-line react-hooks/rules-of-hooks 
  const [history, sethistory] = useState({ 
    loading: true, 
    results: [], 
    err: null, 
  }); 
 
   // eslint-disable-next-line react-hooks/rules-of-hooks 
  useEffect(() => { 
    sethistory({...history, loading: true}) 
    axios.get(`http://localhost:4000/auctions/${id}/winning-bids` ,
    {
      headers: {
         token: auth[0].token,
       },
      }
    
    ) 
    .then((resp) => {  
      sethistory({...history, results: resp.data, loading: false , err: null}); 
 
      }) 
      .catch(err =>{ 
        sethistory({...history, loading:false, err:"something went wrong"}); 
      }); 
  }, 
  [] 
  ); 
 
 
  const resultsArray = Array.from(history.results); 
 
  return ( 
    <>  
      <Table striped> 
 
        <thead style={{ padding:'10rem'}}> 
          <tr> 
          <th > auction name </th> 
          <th> winning Date</th> 
          <th> price </th> 
          <th> image</th> 
 
          </tr> 
        </thead> 
        <tbody> 
          {resultsArray
            .map((History) => ( 
              <tr key={History.id}> 
                <td>{History.auction_name} </td> 
                <td>{History.bid_datetime} </td> 
                <td>{History.bid_price} </td> 
                <td>   
                  <img  src={History.image_url} style={{width:'15%'}} />
                </td> 
              </tr> 
            ))} 
        </tbody> 
      </Table> 
    </> 
  ); 
}; 
 
export default viewhistory;