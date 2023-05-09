import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import { removeAuthUser, getAuthUser } from "../helper/storage";
import { useNavigate } from "react-router-dom";

const header = () =>{
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };

    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >    
             <Link className='nav-link' to={"/"}>Auction</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
          {!auth && <Link className='nav-link' to={"/login"}>Login</Link> }
          {!auth && <Link className='nav-link' to={"/Register"}>Register</Link>  }
          {auth && auth[0].type === "bidder" &&<Link className='nav-link' to={"/ListProduct"}>Auction List</Link>  }
          {auth && auth[0].type === "bidder" &&<Link className='nav-link' to={"/Viewhistory"}>Won Auctions History</Link>  }
          {auth && auth[0].type === "admin" &&<Link className='nav-link' to={"/AcceptRejectRegistration"}>New Accounts</Link>  }
          {auth && auth[0].type === "admin" &&<Link className='nav-link' to={"/Auctiontransaction"}>Transactions </Link>  }
          {auth && auth[0].type === "seller" &&<Link className='nav-link' to={"/ShowDelete"}>Manage Auctions</Link>  }
          {auth && auth[0].type === "seller" &&<Link className='nav-link' to={"/Auctionhistory"}>Auctions History</Link>  }

          </Nav>
          <Nav className="ms-auto">
            {/* Authenticated Routes  */}
            {auth && <Nav.Link onClick={Logout}>Logout</Nav.Link>}
          </Nav>
        </Container>
      </Navbar> 
      );
};

export default header;

