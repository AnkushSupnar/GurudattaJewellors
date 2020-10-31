import React,{Component} from 'react'
import {Form, FormGroup, Input,Label,Col, Container, Button } from 'reactstrap';
import './../../App.css'
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';
import base_url from '../../Service/RestApi';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave, faUndo, faWindowClose} from '@fortawesome/free-solid-svg-icons'
class AddNewCustomer extends Component
{
    
    constructor(props)
    {
        super(props);
        this.state={
            cust:this.initialState.customer
        }
        this.onchange=this.onchange.bind(this);
        this.save = this.save.bind(this);
    }
    initialState={
        customer:{
            fname:'',
            mname:'',
            lname:'',
            gender:'Male',
            address:'',
            city:'',
            post:'',
            taluka:'',
            district:'',
            pin:'',
            contactno:'',
            altercontact:'',
            email:''
            }
    }
    resetForm =()=>{
        this.setState({cust:this.initialState.customer});
    }
    onchange(e)
    {
        
        const target = e.target;
        const value=target.value;
        const name=target.name;
        
        let cust={...this.state.cust};
        cust[name]=value;
        this.setState({cust}); 
    }
    save = e =>
    {
        e.preventDefault();
        const customer={
            fname:this.state.cust.fname,
            mname:this.state.cust.mname,
            lname:this.state.cust.lname,
            gender:'Male',
            address:this.state.cust.address,
            city:this.state.cust.city,
            post:this.state.cust.post,
            taluka:this.state.cust.taluka,
            district:this.state.cust.district,
            pin:this.state.cust.pin,
            contactno:this.state.cust.contactno,
            altercontact:this.state.cust.altercontact,
            email:this.state.cust.email
        }

        //console.log(customer);
      
Axios.post(`${base_url}/customers/`,customer).then(res=>{
            if(res.data!=null)
            {
                toast.success("Record Saved");
            }
            else{
                toast.error(res);
            }
    
        })
       

    }
    render(){
        const {fname,mname,lname,address,city,post,taluka,district,pin,contactno,altercontact,email} = this.state.cust;
        return(
            <Container mt={0} ml={0} className="mt-10"
            style={{backgroundColor: '#1769aa'}}
            >
                    <ToastContainer/>
                <Form sm={12} onReset={this.resetForm} onSubmit={this.save} >
                <Col >
                    <div className="text-center text-white rounded ml-0 p-1" style={{background:'#2196f3'}}>
                        <p className="font-weight-bold text-monospace mt-0 p-1">Add New Customer</p>
                    </div>
                </Col>

                <Col>
                    <div className=" text-center text-white rounded mb-0 p-0" >
                        <p className="font-weight-bold text-monospace mb-0">Full Name</p>
                    </div>
                </Col>
                <FormGroup row className="mt-1" >
                   <Col sm={12} md={4} >
                       <Label for="firstname" className="font-weight-light ">First Name</Label>
                       <Input type="text" id="firstname" name="fname" value={fname} onChange={this.onchange} autoComplete="off" className="form-control mb-1" placeholder="First Name" required/>
                   </Col>
                   <Col sm={12} md={4}>
                       <Label for="middlename" className="font-weight-light">Middle Name</Label>
                       <Input type="text" id="middlename" name="mname" value={mname} onChange={this.onchange} placeholder="Middle Name"/>
                   </Col>
                   <Col sm={12} md={4}>
                       <Label for="lastname" className="font-weight-light">Last Name</Label>
                       <Input type="text" id="lastname" name="lname" value={lname} onChange={this.onchange} placeholder="Last Name"/>
                   </Col>
                </FormGroup>
                <Col >
                    <Container className=" text-center text-white rounded mb-0 p-0 position-static" fluid={true}>
                    <p className="font-weight-bold text-monospace mb-0">Address Details</p></Container>
                </Col>
                <FormGroup row>
                   <Col sm={12} md={4}>
                       <Label for="line1" className="font-weight-light">Address Line 1</Label>
                       <Input type="text" id="line1" name="address"  value={address} onChange={this.onchange} placeholder="Line 1"/>
                   </Col>
                   <Col sm={12} md={4}>
                       <Label for="village" className="font-weight-light">Village Name</Label>
                       <Input type="text" id="village" name="city" value={city} onChange={this.onchange} placeholder="village"/>
                   </Col>
                   <Col sm={12} md={4}>
                       <Label for="post" className="font-weight-light">Post</Label>
                       <Input type="text" id="post" name="post" value={post} onChange={this.onchange} placeholder="Post"/>
                   </Col>
                </FormGroup>
                <FormGroup row>
                   <Col sm={12} md={4}>
                       <Label for="taluka" className="font-weight-light">Taluka Name</Label>
                       <Input type="text" id="taluka" name="taluka" value={taluka} onChange={this.onchange} placeholder="Taluka"/>
                   </Col>
                   <Col sm={12} md={4}>
                       <Label for="district" className="font-weight-light">District Name</Label>
                       <Input type="text" id="district" name="district" value={district} onChange={this.onchange} placeholder="District"/>
                   </Col>
                   <Col sm={12} md={4} >
                       <Label for="pin" className="font-weight-light">Pin Code</Label>
                       <Input type="" id="pin" name="pin" value={pin} onChange={this.onchange} placeholder="Pin"/>
                   </Col>
                </FormGroup>
                <Col>
                    <Container className=" text-center text-white rounded mb-0 p-0" fluid={true}>
                        <p className="font-weight-bold text-monospace mb-0">Contact Details</p>
                    </Container>
                </Col>
                <FormGroup row>
                   <Col sm={12} md={4}>
                       <Label for="mobile" className="font-weight-light">Mobile No</Label>
                       <Input type="number" id="mobile" name="contactno" value={contactno} onChange={this.onchange} placeholder="Mobile No"/>
                   </Col>
                   <Col sm={12} md={4}>
                       <Label for="email" className="font-weight-light">Email Id</Label>
                       <Input type="email" id="email" name="email" value={email} onChange={this.onchange} placeholder="@Email"/>
                   </Col>
                   <Col sm={12} md={4}>
                       <Label for="altmobile" className="font-weight-light">Alternate Mobile No</Label>
                       <Input type="number" id="altmobile" name="altercontact" value={altercontact} onChange={this.onchange} placeholder="Alternate Mobile No"/>
                   </Col>
                   </FormGroup>
                   <FormGroup>
                   <Col sm={12} md={4}>
                       <div>
                       <Button color="success" p={2} type="submit"><FontAwesomeIcon icon={faSave}/> SAVE</Button>{'    '}
                       <Button color="info" type="reset" ><FontAwesomeIcon icon={faUndo}/> RESET</Button>{'   '}
                       <Button color="danger" > <FontAwesomeIcon icon={faWindowClose}/>EXIT</Button>{'    '}
                       </div>
                   </Col>
                </FormGroup>
                </Form>
                
            </Container>
        );
    }
}
export default AddNewCustomer