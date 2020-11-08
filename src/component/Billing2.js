import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, Form, Button, Table } from 'react-bootstrap'
import { Input } from 'reactstrap'
import axios from 'axios'
import base_url from '../Service/RestApi';
import { ToastContainer, toast } from 'react-toastify';
class Billing2 extends Component {
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
        if (name === "") {
            toast.error("Enter Customer Name")
            return
        }
        axios.get(`${base_url}/customers/byname/${name}`).then(res => {
            const c = res.data;
            if (c === null) {
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
        }).catch(err => {
            if (err.response.status === 404)
                toast.error("Server Not Found" + err);
            if (err.response.status === 500)
                toast.error("Name Not Found Select again!");
        })
    }
    itemOnChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        //this.setState({custfullname:target.value})
        let item = { ...this.state.customer };
        item[name] = value;
        this.setState({ item });
        console.log(this.state.item.name);
    }

    searchItem = (name) => {
        if (name === "") {
            return
        }
        console.log("i got to search " + name);
        axios.get(`${base_url}/items/itemByName/${name}`).then(res => {
            const i = res.data;
            let item = {
                id: i.id,
                name: i.name,
                hsncode: i.hsncode,
                purity: i.purity,
                gross: i.gross,
                unit: i.unit,
                otherweight: i.otherweight,
                netweight: i.gross + i.otherweight,
                rate: i.rate,
                labour: i.labour,
                othercharges: i.otherweight,
                metal: i.metal,
                qty: 1,
                total: (i.rate * 1) + i.labour + i.otherweight
            }

            this.setState({ item });
        }).catch(err => {
            if (err.response.status === 404)
                toast.error("Server Not Found" + err);

            if (err.response.status === 500)
                toast.error("Name Not Found Select Item again!");
        })
    }
    qtyOnChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        let item = this.state.item;
        item.qty = value;
        item.total = (item.rate * value) + item.labour + item.otherweight;
        this.setState({ item })
        console.log(item.name);
    }
    save = (e) => {
        e.preventDefault();
    }
    render() {
        const { id, name, hsncode, purity, gross, unit, netweight, otherweight, rate, labour, othercharges, metal, total, qty } = this.state.item;
        const { mname, fname, lname, gender, contactno, altercontact, email, address, city, post, district, taluka, pin } = this.state.customer;
        const { custfullname } = this.state.custfullname;
        const { customerinfo } = this.state.customerinfo
        return (
            <div className="my-1 mx-1" style={{ marginTop: 10 }}>
                <ToastContainer position="top-center" />
                <Form>
                    <Row>
                        <Form.Group as={Col} sm={12} md={4} lg={4} className="bg-primary">
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
                    </Row>
                    <Row>
                        <Form.Group as={Col} sm={12} md={4} lg={4} className="">
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
                                    required autoComplete="off" />
                                <datalist id="itemNameList">
                                    {this.state.itemName.map(item =>
                                        <option key={item}>{item}</option>
                                    )};
                                              </datalist>
                            </div>
                        </Form.Group>
                        <Form.Group as={Col} sm={12} md={1} lg={1} className="mx-auto">
                            <Form.Label className="text-dark" id="hsncode" >HSN Code</Form.Label>
                            <Form.Control type="text" name="hsncode" value={hsncode || ""} placeholder="HSN Code" readOnly />
                        </Form.Group>
                        <Form.Group as={Col} sm={12} md={1} lg={1} className="mx-auto">
                            <Form.Label className="text-dark">Purity</Form.Label>
                            <Form.Control type="text" id="purity" name="purity" value={purity || ""} placeholder="Purity" readOnly />
                        </Form.Group>
                        <Form.Group as={Col} sm={12} md={2} lg={2} className="mx-auto">
                            <Form.Label className="text-dark">Gross Weight</Form.Label>
                            <Form.Control type="text" id="gross" name="gross" value={gross || ""} placeholder="Gross Weight" readOnly />
                        </Form.Group>
                        <Form.Group as={Col} sm={12} md={2} lg={2} className="mx-auto">
                            <Form.Label className="text-dark">Other Weight</Form.Label>
                            <Form.Control type="text" id="otherweight" name="otherweight" value={otherweight || ""} placeholder="Other Weight" readOnly />
                        </Form.Group>
                        <Form.Group as={Col} sm={12} md={2} lg={2} className="bg-success ml-0 ml-lg-0">
                            <Form.Label className="text-dark">Net Weight</Form.Label>
                            <Form.Control type="text" id="netweight" name="netweight" value={netweight || ""} placeholder="Net Weight" readOnly />

                        </Form.Group>
                    </Row>

                </Form>
            </div >
        );
    }
}
export default Billing2