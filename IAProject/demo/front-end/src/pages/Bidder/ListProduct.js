import React,{useState, useEffect} from 'react';
import axios from 'axios';
import ProductCars from "./ProductCards";
import { Alert, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const ListProduct = () =>{
 

   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [Auctions, setAuction] = useState({
      loading: true,
      results: [],
      err: null,
      reload: 0,
    });

    const [search, setSearch] = useState("");


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setAuction({...Auctions, loading: true})
      axios.get("http://localhost:4000/auctions" , {
        params: {
          search:  search,
        }
      })
      .then((resp) => {
        setAuction({...Auctions, results: resp.data, loading: false , err: null});

        })
        .catch(err =>{
          setAuction({...Auctions, loading:false, err:"something went wrong"});
        });
    },
    [Auctions.reload]
    );

    const searchAuction =(e) =>{
      e.preventDefault();
      setAuction({...Auctions, reload: Auctions.reload+1})
    }

    const resultsArray = Array.from(Auctions.results);


    return (

        <div className='home-container p-5'>


      {Auctions.loading == true &&(
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>loading...</span>
        </Spinner>
        )}


        {/*filter */}
          <Form className='mb-3 ' onSubmit={searchAuction}>
           <Form.Group className="mb-3 d-flex " >
           <Form.Control value={search} 
           onChange={(e) => setSearch(e.target.value)} 
           type="text"
           placeholder="Search Auction" />
           <Button className='btn btn-dark ' type="submit" >Submit</Button>
           </Form.Group>
          </Form>
        {Auctions.loading == false && Auctions.err == null &&(
          <>
      {/*list */}
      <div className="row" >
        
        {resultsArray.map((product) => (
            <div className='col-3 card-containar'  key={product.auction_id}>
              <ProductCars 
               name={product.auction_name}
                description={product.description}
                  end_date={product.end_date} 
                  image= { product.image_url}
                  auction_id={product.auction_id}
                  />
            </div> 

        ))}
      </div>
      </>
        )
        }

        {Auctions.loading == false && Auctions.err != null &&(
          <Alert variant='danger' className='p-2'>
            {Auctions.err}
          </Alert>

        )}

        {Auctions.loading == false && Auctions.err == null && Auctions.results.length== 0 &&(
          <Alert variant='info' className='p-2'>
            No Auctions, Please try again.
          </Alert>

        )}

        </div>
      );
};

export default ListProduct;