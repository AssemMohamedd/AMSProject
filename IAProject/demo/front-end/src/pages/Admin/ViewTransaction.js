import React, {useState , useEffect} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useParams } from "react-router-dom";

const ViewTransaction =()=>
{

  let { id } = useParams();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [transaction , sethistory] = useState({
    loading: true,
    results: [],
    err: null,
  });

   // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    sethistory({...transaction, loading: true})
    axios.get(`http://localhost:4000/admino/${id}/transaction` )
    .then((resp) => {
      sethistory({...transaction, results: resp.data, loading: false , err: null});

      })
      .catch(err =>{
        sethistory({...transaction, loading:false, err:"something went wrong"});
      });
  },
  []
  );


  //const resultsArray = Array.from(history.results);

  return (
    
    <> 
            <h3 className="text-center  m-5"> Transaction History </h3>

      <Table striped bordered hover className="my-table">

        <thead>
          <tr>
          <th> auction id</th>
          <th> seller id</th>
          <th> bidder id</th>
          <th> transaction date</th>
          <th> winning bid</th>

          </tr>
        </thead>
        <tbody>
          {transaction.results
            .map((tran) => (
              <tr key={tran.koky}>
                <td>{tran.auction_id} </td>
                <td>{tran.seller_id} </td>
                <td>{tran.bidder_id }</td>
                <td>{tran.transaction_date} </td>
                <td>{tran.winnig_bid }</td>


              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default ViewTransaction;