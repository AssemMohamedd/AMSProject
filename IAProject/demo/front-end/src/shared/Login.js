import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import "../CSS/Login.css"
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { Button} from "react-bootstrap";
import Card from 'react-bootstrap/Card';

import { setAuthUser } from "../helper/storage";
import { useNavigate } from "react-router-dom";


 const Login =()=>
{ 
  const navigate =useNavigate();
   const [login,setLogin] = useState({
    email : '',
    password : '',
    loading :false,
    err:[], 
   });
   const LoginFun=(e)=>
   {
      e.preventDefault();
      setLogin({...login,loading :true,err:[]});
      axios.post("http://localhost:4000/auth/login",{
        email: login.email,
        password:login.password,
      }).then((resp)=>{

        setLogin({...login,loading :false,err:[]});        
        setAuthUser(resp.data);

         navigate("/");
          
      }).catch((errors)=>{
        
        setLogin({...login,
        loading :false,
        err:errors.response.data.errors,
      });

      });
      
   }
    return( 
      
        <div className="login-container"> 
         <Card style={{ width: '40rem',backgroundColor: '#87CEEB'  }}>
        <h2 className="logtitle">Login Form</h2>
        {
          login.err.map((error,index)=>
            (
              <Alert  variant="danger" className="p-2">
             {error.msg}

            </Alert>
            ))}
       



         <Form onSubmit={LoginFun}> 
  <Form.Group className="mb-3">
    <Form.Label  style={{ display: 'flex', justifyContent: 'flex-start' , alignItems: 'center', padding: '1rem' }}>Email :</Form.Label>
    <Form.Control 
     type="email"
     placeholder="Email"
    required
    value={login.email}
     onChange={(e)=>setLogin ({...login ,email:e.target.value})} 
     style={{ fontSize: '18px',width: '600px',marginLeft: '10px' }}/>
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Label style={{ display: 'flex', justifyContent: 'flex-start' , alignItems: 'center', padding: '1rem' }}>Password :</Form.Label>
    <Form.Control type="password" placeholder="Password" 
    required
     value={login.password}
     onChange={(e)=>setLogin ({...login ,password:e.target.value})}
     style={{ fontSize: '18px',width: '600px',marginLeft: '10px' }} />
  </Form.Group>
  <Button variant="secondary" type="submit" disabled={login.loading===true}>
  Login
</Button>
 
</Form>  </Card>

        </div>
    );
 };
 export default Login ;