import { useState } from 'react'; 
import axios from 'axios'; 
import { getAuthUser } from '../../../helper/storage';  
import '../../../CSS/Add.css'; // import your CSS file here
import { Alert} from 'react-bootstrap';

function Add() { 
  const auth = getAuthUser(); 
 
  const [auction_name, setAuctionName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [category_name, setCategoryName] = useState(''); 
  const [start_date, setStartDate] = useState(''); 
  const [end_date, setEndDate] = useState(''); 
  const [image_url, setImage] = useState(null); 
  const [error, setError] = useState(null); 
   

  function handleImageChange(event) { 
    setImage(event.target.files[0]); 
  } 
 
  function handleSubmit(event) { 
    event.preventDefault(); 
 
    const formData = new FormData(); 
    formData.append('auction_name', auction_name); 
    formData.append('description', description); 
    formData.append('category_name', category_name); 
    formData.append('start_date', start_date); 
    formData.append('end_date', end_date); 
    formData.append('image', image_url); 
 
    axios.post(`http://localhost:4000/auctions/create`, formData, { 
      headers: { 
        token: auth[0].token, 
        'Content-Type': 'multipart/form-data' 
      } 
    }) 
      .then(response => { 
        alert(response.data.msg);
      }) 
      .catch(error => {
       
        
        setError(error.response.data.errors[0].msg); 
      }); 
  } 
 
  return ( 
    <div className="add-auction-form"> {/* add class name for styling */}
      {error && <div><Alert variant="danger" className="p-2"> 
          {error} 
        </Alert></div>} 
      <form onSubmit={handleSubmit}> 
        <div className="form-group"> {/* add class name for styling */}
          <label htmlFor="auctionName">Auction Name:</label> 
          <input type="text" id="auctionName" value={auction_name} onChange={event => setAuctionName(event.target.value)} /> 
        </div> 
        <div className="form-group"> {/* add class name for styling */}
          <label htmlFor="description">Description:</label> 
          <textarea id="description" value={description} onChange={event => setDescription(event.target.value)} /> 
        </div> 
        <div className="form-group"> {/* add class name for styling */}
          <label htmlFor="categoryName">Category Name:</label> 
          <input type="text" id="categoryName" value={category_name} onChange={event => setCategoryName(event.target.value)} /> 
        </div> 
        <div className="form-group"> {/* add class name for styling */}
          <label htmlFor="startDate">Start Date:</label> 
          <input type="text" id="startDate" value={start_date} onChange={event => setStartDate(event.target.value)} /> 
        </div> 
        <div className="form-group"> {/* add class name for styling */}
          <label htmlFor="endDate">End Date:</label> 
          <input type="text" id="endDate" value={end_date} onChange={event => setEndDate(event.target.value)} /> 
        </div> 
        <div className="form-group"> {/* add class name for styling */}
          <label htmlFor="image">Image:</label> 
          <input type="file" id="image" onChange={handleImageChange} /> 
        </div> 
        <button type="submit" className="btn btn-dark " >Create Auction</button> 
      </form> 
    </div> 
  ); 
} 
 
export default Add;