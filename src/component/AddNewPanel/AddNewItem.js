import React, { Component } from 'react'
import { Row } from 'reactstrap'
import { Card, Button, Form, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faUndo, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import base_url from '../../Service/RestApi';
class AddNewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.initialState.Item,
            selected: '',
            unitSelect:''

        }
        this.saveItem = this.saveItem.bind(this);
        this.changeItem = this.changeItem.bind(this);
        // this.handleChange=this.handleChange.bind(this);
    }
    initialState = {
        Item: {
            itemname: '',
            hsncode: '',
            purity: '',
            grossweight: '',
            unit:'',
            otherweight: '',
            rate: '',
            labourcharges: '',
            othercharges: '',
            metal: ''
        }
    }
    handleChange = (e) => {
        console.log("Selected====> "+e.target.name)
        this.setState({ selected: e.target.value });
        
    }
    handleChangeUnit=(event)=>{
        //console.log("Target Name ==>"+event.target.name)
        //console.log("Target Value ==>"+event.target.value)
        this.setState({unitSelect:event.target.value})
        console.log("From State=> "+this.state.unitSelect);

        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
           // console.log("Selected ==> "+options[i].value);
          }
        }


    }

    changeItem(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });

    }

    saveItem(event) {
        event.preventDefault();

        const item = {
            name: this.state.item.itemname,
            hsncode: this.state.item.hsncode,
            purity: this.state.item.purity,
            gross: this.state.item.grossweight,
            unit:this.state.unitSelect,
            otherweight: this.state.item.otherweight,
            rate: this.state.item.rate,
            labour: this.state.item.labourcharges,
            othercharges: this.state.item.othercharges,
            metal: this.state.selected
        }
        //toast.success(item.unit);
        
        Axios.post(`${base_url}/items/item/`,item).then(res=>{
            if(res.data!=null)
            {
                toast.success("Item Save Success")
            }
            else
            {
                toast.error(res);
            }
        })


    }
    resetForm = () => {
        this.setState({ item: this.initialState.Item });
    }
    render() {
        const { itemname, hsncode, purity, grossweight, otherweight, rate, labourcharges, othercharges, metal, selected } = this.state.item;
        const{unitSelect}=this.state.unitSelect;
        return (
            <div className={"my-1 mx-10"}>
                <ToastContainer />
                <Row>
                    <Col md={1} sm={0} lg={1}></Col>
                    <Col md={10} sm={12} lg={10}>
                        <div>

                            <Card className={"border border-dark"}
                                style={{ backgroundColor: '#1769aa' }}
                            >
                                <Card.Header className={"border border-light bg-primary text-center text-white p-0"}><h2>Add New Item</h2></Card.Header>
                                <Form onReset={this.resetForm} onSubmit={this.saveItem} id="itemFormId">
                                    <Card.Body>
                                        <Form.Row>
                                            <Form.Group as={Col} sm={8} md={8} lg={8}  >
                                                <Form.Label>Item Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="itemname"
                                                    value={itemname}
                                                    onChange={this.changeItem}
                                                    required={true}
                                                    placeholder="Enter Name" />
                                            </Form.Group>
                                            <Form.Group as={Col} sm={2} md={2} lg={2}>
                                                <Form.Label>Select</Form.Label>
                                                <select value={selected} name="metal" onChange={this.handleChange} className={"form-control bg-success text-white"}>
                                                <option value="">Select Metal</option>
                                                    <option value="Gold">Gold</option>
                                                    <option value="Silver">Silver</option>
                                                    <option value="Platinum">Platinum</option>
                                                </select>
                                            </Form.Group>
                                            <Form.Group as={Col} sm={2} md={2} lg={2}>
                                                <Form.Label>Item Metal</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="itemname"
                                                    value={this.state.selected}
                                                    readOnly={true}
                                                    required={true}
                                                    placeholder="Select Metal Name" />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>

                                            <Form.Group as={Col}>
                                                <Form.Label>Item HSN Code</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="hsncode"
                                                    value={hsncode}
                                                    onChange={this.changeItem}
                                                    required={true}
                                                    placeholder="Enter HSN Code" />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Item Putiy in %</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="purity"
                                                    value={purity}
                                                    onChange={this.changeItem}
                                                    required={true}
                                                    placeholder="Enter Purity" />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Item Gross Weight(Metal)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="grossweight"
                                                    value={grossweight}
                                                    onChange={this.changeItem}
                                                    required={true}
                                                    placeholder="Enter Gross Weight" />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Weight Unit</Form.Label>
                                                <select value={unitSelect} name="unit" onChange={this.handleChangeUnit} className={"form-control bg-success text-white"}>
                                                <option value="">Select Metal Weight Unit</option>
                                                    <option value="Mili">Mili Gram</option>
                                                    <option value="Gunj">Gunj</option>
                                                    <option value="Tola">Tola</option>
                                                </select>
                                            </Form.Group>
                                            <Form.Group as={Col} sm={2} md={2} lg={2}>
                                                <Form.Label>Metal Unit</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="unit"
                                                    value={this.state.unitSelect}
                                                    readOnly={true}
                                                    required={true}
                                                    placeholder="Select Metal " />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Item Other Weight</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="otherweight"
                                                    value={otherweight}
                                                    onChange={this.changeItem}
                                                    required={true}
                                                    placeholder="Enter Other Weight" />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Rate<br></br>(RS)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="rate"
                                                    value={rate}
                                                    onChange={this.changeItem}
                                                    required={true}
                                                    placeholder="Enter Rateclear" />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Item Labour Charges(RS.)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="labourcharges"
                                                    value={labourcharges}
                                                    onChange={this.changeItem}
                                                    required={true}
                                                    placeholder="Enter Labour Charges" />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Item Other Charges(RS.)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="othercharges"
                                                    value={othercharges}
                                                    onChange={this.changeItem}
                                                    required={true}
                                                    placeholder="Enter Other Charges" />
                                            </Form.Group>

                                        </Form.Row>
                                    </Card.Body>

                                    <Card.Footer className={"text-right"}>
                                        <Button
                                            size="lg"
                                            variant="success"
                                            type="submit">
                                            <FontAwesomeIcon icon={faSave} />{' '}
                                                ADD
                                        </Button>{' '}
                                        <Button
                                            size="lg"
                                            variant="warning"
                                            type="reset">
                                            <FontAwesomeIcon icon={faUndo} />{' '}
                                                RESET
                                        </Button>{' '}
                                        <Button
                                            size="lg"
                                            variant="danger"
                                            type="">
                                            <FontAwesomeIcon icon={faWindowClose} />{' '}
                                                BACK
                                        </Button>
                                    </Card.Footer>
                                </Form>

                            </Card>
                        </div>
                    </Col>
                    <Col md={1} sm={12} lg={1}></Col>
                </Row>
            </div>
        )
    }
}
export default AddNewItem