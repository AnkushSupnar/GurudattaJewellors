import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, Form, Button, Table } from 'react-bootstrap'
import { Input } from 'reactstrap'
import axios from 'axios'
import base_url from '../Service/RestApi';
class Billing extends Component {
    constructor() {
        super();
        this.nameList = [
            "Amit",
            "Amol",
            "Suresh",
            "Abhijeet",
            "Rameshwar",
            "Prashant",
            "Anushka",
            "Anita"
        ];

        this.state = {
            customer: this.initialState.customer,
            fullname: [],
            itemName: [],
            customerName:[],
            item:this.initialState.item

        }
        this.onChange = this.onChange.bind(this)
    }
    initialState = {
        customer: {
            mname: '',
            fname: '',
            lname: '',
            gender: '',
            contactno: '',
            altercontact: '',
            email: '',
            address: '',
            city: '',
            post: '',
            district: '',
            taluka: '',
            pin: ''
        },
        item: {
            id:'',
            name:'',
            hsncode:'',
            purity:'',
            gross:'',
            unit:'',
            otherweight:'',
            netweight:'',
            rate:'',
            labour:'',
            othercharges:'',
            metal:'',
            qty:'',
            total:''
        }
    }
    componentDidMount() {
        axios.get(`${base_url}/items/allItemNames`).then(res => {
            const item = res.data;
            this.setState({ itemName: item })
        })

        axios.get(`${base_url}/customers/allnames`).then(res=>{
            const names = res.data;
            
            this.setState({fullname:names})
        })
    }
    onChange(e)
    {
        console.log("Changed");
    }


    render() {
        const {id,name,hsncode,purity,gross,unit,netweight,otherweight,rate,labour,othercharges,metal,total,qty}=this.state.item;
        const {custFullName}=this.state.fullname;
        const {mname,fname,lname,gender,contactno,altercontact,email,address,city,post,district,taluka,pin} = this.state.customer;
        return (
            <div className="my-1 mx-1" style={{ marginTop: 10 }}>
                <Row >
                    <Col md={8} sm={12} lg={8}>
                        <Card className={"border border-dark"}>

                            <Card.Body className="my-0">
                                <Card.Title className="bg-success text-white text-center ">Customer Information</Card.Title>
                                <Form>
                                    <Form.Row className="noGutters">
                                        <Form.Group as={Col} sm={12} md={4} lg={4} className="">
                                            <Form.Label className="text-dark">Select Customer</Form.Label>
                                            <div className="App-Component bg-success">
                                                <Input type="text" 
                                                    className="Input"
                                                    name="customerName" 
                                                    list="customerNameList" 
                                                    value={name}
                                                    onChange={this.onChange}
                                                    placeholder="Enter Customer Name" 
                                                    onKeyPress={
                                                        event=>{
                                                            if(event.key==='Enter')
                                                            {
                                                                console.log("Value Enter "+event.target.value);

                                                            }
                                                        }
                                                    }
                                                    required />
                                                <datalist id="customerNameList">
                                                    {this.state.fullname.map(name =>
                                                        <option key={name}>{name}</option>
                                                    )};
                                              </datalist>
                                            </div>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={8} lg={8} className="my-0">
                                            <Form.Label className="text-dark">Customer Information</Form.Label>
                                            <Form.Control as="textarea" rows="1" readOnly />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={12} md={4}>
                                            <Form.Label className="text-dark">Item Name</Form.Label>
                                            <div className="App-Component">
                                                <Input 
                                                    type="text" 
                                                    name="itemName" 
                                                    list="itemNameList" 
                                                    placeholder="Enter Item Name" 
                                                    onKeyPress={
                                                        event=>{
                                                            if(event.key==='Enter')
                                                            {
                                                                console.log("Key Enter")
                                                            }
                                                        }
                                                    }
                                                    required />
                                                <datalist id="itemNameList">
                                                    {this.state.itemName.map(item =>
                                                        <option key={item}>{item}</option>
                                                    )};
                                              </datalist>
                                            </div>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark" id="hsncode" name="hsncode" value={hsncode}>HSN Code</Form.Label>
                                            <Form.Control type="text" placeholder="HSN Code" readOnly />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Purity</Form.Label>
                                            <Form.Control type="text" id="purity" name="purity" value={purity} placeholder="Purity" readOnly />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Gross Weight</Form.Label>
                                            <Form.Control type="text" id="gross" name="gross" value={gross} placeholder="Gross Weight" readOnly />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Other Weight</Form.Label>
                                            <Form.Control type="text" id="otherweight" name="otherweight" value={otherweight} placeholder="Other Weight" readOnly />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Net Weight</Form.Label>
                                            
                                            <Form.Control type="text" id="netweight" name="netweight" value={netweight}  placeholder="Net Weight" readOnly />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Rate</Form.Label>
                                            <Form.Control type="text" id="rate" name="rate" value={rate} placeholder="Rate" readOnly />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Labour Charges</Form.Label>
                                            <Form.Control type="text" id="labour" name="labour" value={labour} placeholder="Labour Charges" readOnly />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Other Charges</Form.Label>
                                            <Form.Control type="text" id="othercharges" name="othercharges" value={othercharges} placeholder="Other Charges" readOnly />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                    <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Metal Name</Form.Label>
                                            <Form.Control type="text" id="metal" name="metal" value={metal} placeholder="Metal Name" readOnly />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Total Amount</Form.Label>
                                            <Form.Control type="text" id="total" name="total" value={total} placeholder="Total Amount" readOnly/>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Quantity</Form.Label>
                                            <Form.Control type="number" id="qty" name="qty" value={qty} placeholder="Pices" readOnly/>
                                        </Form.Group>

                                    </Form.Row>
                                    <Button variant="primary" type="submit">ADD</Button>{' '}
                                    <Button variant="danger" type="reset">CLEAR</Button>{' '}
                                    <Button variant="danger" type="button">EDIT</Button>{' '}
                                    <Button variant="danger" type="button">CANCEL</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <Card className={"border border-dark"}>
                            <Card.Body>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Item Name</th>
                                            <th>HSN</th>
                                            <th>Purity</th>
                                            <th>Gross Weight</th>
                                            <th>Other Weight</th>
                                            <th>Net Weight</th>
                                            <th>Rate</th>
                                            <th>Labour Charges</th>
                                            <th>Other Charges</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>HSN</td>
                                            <td>Purity</td>
                                            <td>Other Weight</td>
                                            <td>Net Weight</td>
                                            <td>Rate</td>
                                            <td>Labour Charges</td>
                                            <td>Item Name</td>
                                            <td>Other Charges</td>
                                            <td>dotal</td>
                                            <td>Gross Weight</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>HSN</td>
                                            <td>Purity</td>
                                            <td>Other Weight</td>
                                            <td>Net Weight</td>
                                            <td>Rate</td>
                                            <td>Labour Charges</td>
                                            <td>Item Name</td>
                                            <td>Other Charges</td>
                                            <td>dotal</td>
                                            <td>Gross Weight</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} sm={12} lg={4}>
                        <Card className={"border border-dark"}>
                            <Card.Title className="bg-success text-white">Old Bills</Card.Title>
                            <Card.Body>
                                <Form>
                                    <Form.Label className="text-dark">Item Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="itemname"
                                        required={true}
                                        placeholder="Enter Name" />
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        This is col 1
                    </Col>

                </Row>
            </div>

        );
    }
}
export default Billing