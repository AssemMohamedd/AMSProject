import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../../helper/storage";
import "../../../CSS/ManageAuction.css"

const ShowDelete = () => {
  const auth = getAuthUser();
  const user_id = auth[0].user_id; 
  console.log(auth[0].user_id);
  const [Auction, setAuction] = useState({
    loading: true,
    results: [],
    err: null, 
    reload: 0,
  });

  useEffect(() => {
    setAuction({ ...Auction, loading: true });
    axios
      .get(`http://localhost:4000/auctions/${user_id}`
      , {
        headers: {
          token: auth.token,
        },
      })
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

  const deleteAuction = (auction_id) => {
    axios
      .delete(`http://localhost:4000/auctions/${auction_id}` )
      .then((resp) => {
        setAuction({ ...Auction, reload:Auction.reload + 1 });
      })
      .catch((err) => {
        console.log(err);

      });
  };

  return (
    <div className="manage-Auctions p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage Auction</h3>
        <Link to={"add"} className="btn btn-success">
          Add New Auction +
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th> Name</th>
            <th> Description</th>
            <th>Start Date</th>
            <th> end Date</th>
            <th> category name</th>
            <th> Action</th>

            
          </tr>
        </thead>
        <tbody>
          {Auction.results.map((Auction) => (
            <tr key={Auction}>
              <td>{Auction.auction_id}</td>
              <td>
                <img
                  src={Auction.image_url}
                  alt={Auction.auction_name}
                  className="image-avatar"
                />
              </td>
              <td> {Auction.auction_name} </td>
              <td>{Auction.description}</td>
              <td>{Auction.start_date}</td>
              <td>{Auction.end_date}</td>
              <td>{Auction.category_name}</td>

              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteAuction(Auction.auction_id);
                  }}>
                  Delete
                </button>
                <Link 
                  to={"" + Auction.auction_id}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
               
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ShowDelete;