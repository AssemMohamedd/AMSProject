import React , { useState }from "react";
import Form from 'react-bootstrap/Form';
import "../CSS/Login.css"
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';
import { Button } from "react-bootstrap";
import { setAuthUser } from "../helper/storage";
import { useNavigate } from "react-router-dom";

 const Register =()=>
 {
  const navigate =useNavigate();
  const [register,setRegister] = useState({
   user_name :'',
   email : '',
   password : '',
   phone:'',
   type :'',
   loading :false,
   err:[], 
  });
  const RegisterFun=(e)=>
  {
     e.preventDefault();
     setRegister({...register,loading :true,err:[]});
     axios.post("http://localhost:4000/Auth/register",{
      user_name:  register.user_name ,
       password: register.password,
       email: register.email,
       type : register.type,
       phone : register.phone,

     }).then((resp)=>{

       setRegister({...register,loading :false,err:[]});
       navigate("/Login");
         
     }).catch((errors)=>{
       setRegister({...register,
       loading :false,
       err:errors.response.data.errors,
     });

     });
     
  }
    return(
        <div className="register-container"> 
         <Card style={{ width: '40rem',backgroundColor: '#87CEEB'  }}>
        <h2 className="regtitle">Registration Form</h2>
        {
          register.err.map((error,index)=>
            (
              <Alert  variant="danger" className="p-2" key={index}>
             {error.msg}

            </Alert>
            ))}
         <Form onSubmit={RegisterFun}> 
         <Form.Group className="mb-3">
    <Form.Label  style={{ display: 'flex', justifyContent: 'flex-start' , alignItems: 'center', padding: '1rem' }}>Enter full name :</Form.Label>
    <Form.Control type="text" placeholder="Full name"  value={register.user_name}
     onChange={(e)=>setRegister ({...register ,user_name:e.target.value})}  style={{ fontSize: '18px',width: '600px',marginLeft: '10px' }} />
  </Form.Group>
         
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label  style={{ display: 'flex', justifyContent: 'flex-start' , alignItems: 'center', padding: '1rem' }}>Password :</Form.Label>
    <Form.Control type="password" placeholder="password"  value={register.password}
     onChange={(e)=>setRegister ({...register ,password:e.target.value})}  style={{ fontSize: '18px',width: '600px',marginLeft: '10px' }}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label  style={{ display: 'flex', justifyContent: 'flex-start' , alignItems: 'center', padding: '1rem' }}>Email :</Form.Label>
    <Form.Control type="email" placeholder="Email" value={register.email}
     onChange={(e)=>setRegister ({...register ,email:e.target.value})}  style={{ fontSize: '18px',width: '600px',marginLeft: '10px' }} />
   
  </Form.Group>

  
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label  style={{ display: 'flex', justifyContent: 'flex-start' , alignItems: 'center', padding: '1rem' }}>type:</Form.Label>
    <Form.Control type="type" placeholder="type"  value={register.type}
     onChange={(e)=>setRegister({...register ,type:e.target.value})}   style={{ fontSize: '18px',width: '600px',marginLeft: '10px' }}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label  style={{ display: 'flex', justifyContent: 'flex-start' , alignItems: 'center', padding: '1rem' }}>phone:</Form.Label>
    <Form.Control type="phone" placeholder="Phone"  value={register.phone}
     onChange={(e)=>setRegister ({...register ,phone:e.target.value})}  style={{ fontSize: '18px',width: '600px',marginLeft: '10px' }} />
  </Form.Group>
  <Button variant="primary " type="submit" disabled={register.loading===true}>
    Register
   </Button>
 
  {/* <ButtonGroup>
      

      <DropdownButton as={ButtonGroup} title="Regiter as" id="bg-nested-dropdown">
      
        <Dropdown.Item eventKey="2">Bidder</Dropdown.Item>
        <Dropdown.Item eventKey="2">Seller</Dropdown.Item>

      </DropdownButton>
    </ButtonGroup> */}
 
</Form>  </Card>
        </div>
    );
 };
 export default Register ;