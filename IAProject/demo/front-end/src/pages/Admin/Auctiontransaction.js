import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/storage";

const Auctiontransaction = () => {
 
  
  const [Auction, setAuction] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setAuction({ ...Auction, loading: true });
    axios
      .get(`http://localhost:4000/auctions/`
    //   , {
    //     headers: {
    //       token: auth.token,
    //     },
    //   }
      )
      .then((resp) => {
        setAuction({ ...Auction, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setAuction({
          ...Auction,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [Auction.reload]);

  

  return (
    <div className="manage-Auctions p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">View Transactions </h3>
       
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Image</th>
            <th> Name</th>
            <th> Description</th>
            <th>Start Date</th>
            <th> end Date</th>
            <th> category name</th>
            <th> Auction status</th>
            <th> Action</th>

            
          </tr>
        </thead>
        <tbody>
          {Auction.results.map((transa) => (
            <tr key={transa.tina}>
              <td>{transa.auction_id}</td>
              <td>
                <img
                  src={transa.image_url}
                  alt={transa.auction_name}
                  className="image-avatar"
                />
              </td>
              <td> {transa.auction_name} </td>
              <td>{transa.description}</td>
              <td>{transa.start_date}</td>
              <td>{transa.end_date}</td>
              <td>{transa.category_name}</td>
              <td>{transa.auction_status}</td>

              <td>
               
                <Link
                  to={"" + transa.auction_id}
                  className="btn btn-sm btn-primary mx-2">
                  View Transaction
                </Link>
               
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Auctiontransaction;