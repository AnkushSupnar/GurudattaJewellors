import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, Form, Button, Table } from 'react-bootstrap'
import { Input } from 'reactstrap'
import axios from 'axios'
import base_url from '../Service/RestApi';
import { ToastContainer, toast } from 'react-toastify';

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
            custfullname: '',
            itemName: [],
            customerName: [],
            item: this.initialState.item,
            customerinfo: 'Customer Information'
        }
        //   this.onchange = this.onchange.bind(this);
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
            id: '',
            name: '',
            hsncode: '',
            purity: '',
            gross: '',
            unit: '',
            otherweight: '',
            netweight: '',
            rate: '',
            labour: '',
            othercharges: '',
            metal: '',
            qty: '',
            total: ''
        }
    }
    componentDidMount() {
        axios.get(`${base_url}/items/allItemNames`).then(res => {
            const item = res.data;
            this.setState({ itemName: item })
        })

        axios.get(`${base_url}/customers/allnames`).then(res => {
            const names = res.data;

            this.setState({ fullname: names })
        })
    }
    onchange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        //this.setState({custfullname:target.value})
        let customer = { ...this.state.customer };
        customer[name] = value;
        this.setState({ customer });
        this.setState({ customerinfo: customer.fname })
    }
    searchCustomer = (name) => {
        if(name==="")
        {
            toast.error("Enter Customer Name")
            return
        }
        axios.get(`${base_url}/customers/byname/${name}`).then(res => {
            const c = res.data;
            if(c===null)
            {
                return
            }
            this.setState({ customer: c })
            let info = "Name:- " + c.fname + " " + c.mname + " " + c.lname +
                "Gender:-" + c.gender +
                " ContactNo:-" + c.contactno + "/" + c.altercontact +
                " Email:" + c.email +
                " Address:" + c.address +
                " City:" + c.city +
                " Post:" + c.post +
                " Taluka:" + c.taluka +
                " Dist:" + c.district;
            this.setState({ customerinfo: info });
        }).catch(err=>{
            if(err.response.status===404)
            toast.error("Server Not Found"+err);
            if(err.response.status===500)
            toast.error("Name Not Found Select again!");
        })
    }
    itemOnChange=(e)=>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        //this.setState({custfullname:target.value})
        let item = { ...this.state.customer };
        item[name] = value;
        this.setState({ item });
        console.log(this.state.item.name);
    }

    searchItem=(name)=>{
        if(name==="")
        {
            return
        }
        console.log("i got to search "+name);
        axios.get(`${base_url}/items/itemByName/${name}`).then(res=>{
            const i = res.data;
            let item= {
                id: i.id,
                name: i.name,
                hsncode: i.hsncode,
                purity: i.purity,
                gross: i.gross,
                unit: i.unit,
                otherweight: i.otherweight,
                netweight: i.gross+i.otherweight,
                rate: i.rate,
                labour: i.labour,
                othercharges: i.otherweight,
                metal: i.metal,
                qty: 1,
                total: (i.rate*1)+i.labour+i.otherweight
            }
            
            this.setState({item});
        }).catch(err=>{
            if(err.response.status===404)
            toast.error("Server Not Found"+err);
            
            if(err.response.status===500)
            toast.error("Name Not Found Select Item again!");
        })
    }
    qtyOnChange=(e)=>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        let item = this.state.item;
        item.qty = value;
        item.total= (item.rate*value)+item.labour+item.otherweight;
        this.setState({item})
        console.log(item.name);
    }
    save=(e)=>{
        e.preventDefault();
    }

    render() {
        const { id, name, hsncode, purity, gross, unit, netweight, otherweight, rate, labour, othercharges, metal, total, qty } = this.state.item;
        const { mname, fname, lname, gender, contactno, altercontact, email, address, city, post, district, taluka, pin } = this.state.customer;
        const { custfullname } = this.state.custfullname;
        const { customerinfo } = this.state.customerinfo
        return (
            <div className="my-1 mx-1" style={{ marginTop: 10 }}>
                <ToastContainer position="top-center"/>
                <Row >
                    <Col md={8} sm={12} lg={8}>
                        <Card className={"border border-dark"}>
                            <Card.Body className="my-0">
                                <Card.Title className="bg-success text-white text-center ">Customer Information</Card.Title>
                                <Form onSubmit={this.save}>
                                    <Form.Row className="noGutters">
                                        <Form.Group as={Col} sm={12} md={4} lg={4} className="">
                                            <Form.Label className="text-dark">Select Customer</Form.Label>
                                            <div className="App-Component bg-success">
                                                <Input type="text"
                                                    className="Input"
                                                    name="fname"
                                                    list="customerNameList"
                                                    value={custfullname} onChange={this.onchange}
                                                    placeholder="Enter Customer Name"
                                                    onKeyPress={
                                                        event => {
                                                            if (event.key === 'Enter') {

                                                                this.searchCustomer(event.target.value);
                                                            }
                                                        }
                                                    }
                                                    required autoComplete="off" />
                                                <datalist id="customerNameList">
                                                    {this.state.fullname.map(name =>
                                                        <option key={name}>{name}</option>
                                                    )};
                                              </datalist>

                                            </div>
                                        </Form.Group>

                                        <Form.Group as={Col} sm={12} md={8} lg={8} className="my-0">
                                            <div className="text-dark border border-primary">{this.state.customerinfo}</div>

                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={12} md={4}>
                                            <Form.Label className="text-dark">Item Name</Form.Label>
                                            <div className="App-Component">
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    value={name}
                                                    onChange={this.itemOnChange}
                                                    list="itemNameList"
                                                    placeholder="Enter Item Name"
                                                    onKeyPress={
                                                        event => {
                                                            if (event.key === 'Enter') {
                                                                this.searchItem(event.target.value)
                                                            }
                                                        }
                                                    }
                                                    required autoComplete="off"/>
                                                <datalist id="itemNameList">
                                                    {this.state.itemName.map(item =>
                                                        <option key={item}>{item}</option>
                                                    )};
                                              </datalist>
                                            </div>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark" id="hsncode" >HSN Code</Form.Label>
                                            <Form.Control type="text" name="hsncode" value={hsncode||""} placeholder="HSN Code" readOnly />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Purity</Form.Label>
                                            <Form.Control type="text" id="purity" name="purity" value={purity||""} placeholder="Purity" readOnly />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Gross Weight</Form.Label>
                                            <Form.Control type="text" id="gross" name="gross" value={gross||""} placeholder="Gross Weight" readOnly />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Other Weight</Form.Label>
                                            <Form.Control type="text" id="otherweight" name="otherweight" value={otherweight||""} placeholder="Other Weight" readOnly />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Net Weight</Form.Label>

                                            <Form.Control type="text" id="netweight" name="netweight" value={netweight||""} placeholder="Net Weight" readOnly />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Rate</Form.Label>
                                            <Form.Control type="text" id="rate" name="rate" value={rate||""} placeholder="Rate" readOnly />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Labour Charges</Form.Label>
                                            <Form.Control type="text" id="labour" name="labour" value={labour||""} placeholder="Labour Charges" readOnly />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Other Charges</Form.Label>
                                            <Form.Control type="text" id="othercharges" name="othercharges" value={othercharges||""} placeholder="Other Charges" readOnly />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Metal Name</Form.Label>
                                            <Form.Control type="text" id="metal" name="metal" value={metal||""} placeholder="Metal Name" readOnly />
                                        </Form.Group>
                                        
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Quantity</Form.Label>
                                            <Form.Control type="number" id="qty" name="qty" value={qty||""} onChange={this.qtyOnChange} placeholder="Pices" />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={12} md={4} lg={4}>
                                            <Form.Label className="text-dark">Total Amount</Form.Label>
                                            <Form.Control type="text" id="total" name="total" value={total||""} placeholder="Total Amount" readOnly />
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