import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from '../../../helper/storage'; 
import { useParams } from "react-router-dom";

const Update = () => {
  let { id } = useParams();
  const auth = getAuthUser(); 
  const [auctions, setauctions] = useState({
    auction_name: "",
    description: "",
    start_date : "",
    end_date:"",
    category_name:"",
    image_url: null,
    err: "",
    loading: false,
    reload: false,
    success: null,
  });
  const image_url = useRef(null);

  const updateauctions = (e) => {
    e.preventDefault();

    setauctions({ ...auctions, loading: true });

    const formData = new FormData();
    formData.append("auction_name", auctions.auction_name);
    formData.append("description", auctions.description);
    formData.append("start_date", auctions.start_date);
    formData.append("end_date", auctions.end_date);
    formData.append("category_name", auctions.category_name);
    if (image_url.current.files && image_url.current.files[0]) {
      formData.append("image_url", image_url.current.files[0]);
    }
    axios.put(`http://localhost:4000/auctions/${id}` , formData , {
      headers: {
         token: auth[0].token,
         "Content-Type":"multipart/form-data",
       },
      }
      )
      .then((resp) => {
        setauctions({
          ...auctions,
          loading: false,
          success: "Auction updated successfully !",
          reload: auctions.reload + 1,
        });
      })
      .catch((err) => {
        
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/auctions/koky/${id}`)
      .then((resp) => {
        setauctions({
          ...auctions,
          auction_name: resp.data[0].auction_name,
          description: resp.data[0].description,
          start_date: resp.data[0].start_date,
          end_date: resp.data[0].end_date,
          category_name: resp.data[0].category_name,
          image_url: resp.data[0].image_url,
        });

      })
      .catch((err) => {
      });
  }, [auctions.reload]);

  return (
    <div className="login-container">
      <h1>Update Auction Form</h1>

      {auctions.err && (
        <Alert variant="danger" className="p-2">
          {auctions.err}
        </Alert>
      )}

      {auctions.success && (
        <Alert variant="success" className="p-2">
          {auctions.success}
        </Alert>
      )}

      <Form onSubmit={updateauctions} className="text-center py-2">
        <img
          alt={auctions.image_url}
          style={{
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            border: "1px solid #ddd",
            marginBottom: "10px",
          }}
          src={auctions.image_url}
        />

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="auction Name"
            value={auctions.auction_name}
            onChange={(e) => setauctions({ ...auctions, auction_name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={auctions.description}
            onChange={(e) =>
              setauctions({ ...auctions, description: e.target.value })
            }
            rows={2}></textarea>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={auctions.start_date}
            onChange={(e) => setauctions({ ...auctions, start_date: e.target.value })}
            type="text"
            required
            placeholder="Start date"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={auctions.end_date}
            onChange={(e) => setauctions({ ...auctions, end_date: e.target.value })}
            type="text"
            required
            placeholder="End date"
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Control
            value={auctions.category_name}
            onChange={(e) => setauctions({ ...auctions, category_name: e.target.value })}
            type="text"
            required
            placeholder="Category Name"
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <input type="file" className="form-control" ref={image_url} />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update auctions
        </Button>
      </Form>
    </div>
  );
};

export default Update;