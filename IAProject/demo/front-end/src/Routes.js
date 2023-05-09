import App from "./App";
import Home from "./pages/home/Home";
import Login from "./shared/Login";
import Register from "./shared/Register";
import ListProduct from "./pages/Bidder/ListProduct"
// import Bidder from "./middleware/Bidder";
import {createBrowserRouter , Navigate} from "react-router-dom";
//import Seller from "./middleware/Seller";
import Viewhistory from "./pages/Bidder/Viewhistroy";
import AcceptRejectRegistration from "./pages/Admin/AcceptRejectRegistration";
import BidFormNew from './pages/Bidder/BidFormNew';
import AuctionHistory from "./pages/Seller/AuctionHistory";
import Add from "./pages/Seller/CRUDoperation/Add";
import ShowDelete from "./pages/Seller/CRUDoperation/ShowDelete";
import Update from "./pages/Seller/CRUDoperation/Update";
import Auctiontransaction from "./pages/Admin/Auctiontransaction";
import ViewTransaction from './pages/Admin/ViewTransaction';
import Bidder from "./middleware/Bidder";
import Seller from "./middleware/Seller";
import Admin from "./middleware/Admin";
import Guest from "./middleware/Guest";
  
const Routes = createBrowserRouter([
{
  path:"",
  element: <App />,
  children: [{
    path: "/",
    element: <Home />,
      },
 
      {
        element: <Guest />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },


      { 
        element: <Admin/>,
        children: [ 
          { 
            path: "/Auctiontransaction", 
            element: <Auctiontransaction />, 
          }, 
          {
            path: "/Auctiontransaction/:id", 
            element: <ViewTransaction/>, 
          },
          {
            path: "/AcceptRejectRegistration",
            element: < AcceptRejectRegistration/>,
          },
        ]
      },
        
      { 
        element: <Seller/>,
        children: [ 
          { 
            path: "/ShowDelete", 
            element: <ShowDelete />, 
          }, 
          { 
            path: "/ShowDelete/add", 
            element: <Add />, 
          }, 
          { 
            path: "/ShowDelete/:id", 
            element: <Update />, 
          }, 
          {
            path: "/AuctionHistory",
            element: <AuctionHistory/>,
          },
        ], 
      },

      { 
        element:<Bidder />,
        children: [ 
          { 
            path: "/ListProduct", 
            element: <ListProduct />, 
          }, 
          {
            path: "/ListProduct/:id", 
            element: <BidFormNew/>, 
          },
          {
            path: "/viewhistory",
            element: <Viewhistory />,
          },
     
        ]
      },


]
},
{
  path: "*",
  element: <Navigate to={"/"}/>
},
]);
export default Routes;