import React, { Component } from 'react'
import {Button, Form, FormGroup, Label, Input,Container, Row, Col, Card, CardHeader, CardBody} from 'reactstrap'
import './Login.css'
import axios from 'axios'
import base_url from "./../Service/RestApi";  //"http://localhost:8080/guru";
import { ToastContainer, toast } from 'react-toastify';
//import { Redirect } from "react-router-dom";
//import Dashboard from './Dashboard';
import UserDetails from "./../Service/UserDetails";


class Login extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            username:'',
            password:'',
            status:'',
            msg:'',
            errorMsg:'',
            redirect: false,
            login:false
        }
      
        this.onchange=this.onchange.bind(this);
        this.login=this.login.bind(this);
    }
    
    async login(){
        //http://localhost:8080/guru/login/Admin

        /*var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({"id":"2","password":"123","status":"logout","userName":"Admin"});
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            //body: raw,
            redirect: 'follow'
          };
        const username=this.state.username;
        fetch(`http://localhost:8080/guru/login/${username}`, requestOptions)
  .then(response => response.text())
  .then(result => {
      console.log(result);
      toast.success(result.stringify);
    })
  .catch(error => console.log('error', error));
*/
    const username=this.state.username;
       if(username)
       {
           try{
           
                const respo = await axios.get(`${base_url}/logins/login/${username}`);
               
                if(respo.data.password===this.state.password)
                    {
                        toast.success("Login Success");
                        //return to next page
                        UserDetails.username=username;
                        UserDetails.loggedin=true;
                         this.props.history.push("/dashboard");
                    }
                else{
                        toast.error("Wrong Details");
                        return;
                    }
            }catch(err)
                {
                    toast.error(err);
                }
        }
        else{
               toast.error("Enter User Name and Password");
                return;
            }
}
    onchange(e)
    {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);   
    }
    
    render(){
        // if(UserDetails.username)
        // {
        //     toast.success("Already Logged in");
        //     this.props.history.push("/dashboard");
        // }
        return(
            
            <div className="my-5  ">
                <ToastContainer />
                <Row>
                    <Col md={2} sm={0} lg={4}></Col>
                    <Col md={8} sm={12} lg={4}>
                        <div>
                        <Card >
                            <CardHeader className="text-center bg-primary text-white ">LOGIN</CardHeader>
                            <CardBody>
                            <Form onSubmit={this.login}>
                            <FormGroup>
                                <Label for="username">Email</Label>
                                <Input type="text" name="username" id="username" value={this.state.username} onChange={this.onchange} placeholder="Enter User Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Password">Password</Label>
                                <Input type="password" name="password" id="Password" value={this.state.password} onChange={this.onchange} placeholder="Enter Password" />
                            </FormGroup>
                                <Container className="text-center">
                                    <Button type="button" color="primary" className="text-center" onClick={this.login} value="Login">Login</Button>
                                    
                                    <Button color="danger" className="text-center mx-3" href="/">Cancel</Button>
                                </Container>
                        </Form>
                            </CardBody>
                        </Card>
                       
                        
                        </div>
                    </Col>
                    <Col md={2} sm={0} lg={4}></Col>
                </Row>
          </div>
        );
    }
}
export default Login