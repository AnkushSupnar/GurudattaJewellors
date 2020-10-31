import React, { Component } from 'react'
import { ButtonGroup, Card, Table ,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import base_url from './../../Service/RestApi'
import { faList, faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
class AllCustomer extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            customers:[]
        };
    }
    componentDidMount()
    {
        this.findAllCustmers();
    }
    findAllCustmers()
    {
        axios.get(`${base_url}/customers`)
        .then(response=>response.data)
        .then((data)=>{this.setState({customers:data})});
    }
    render() {
        return (
            <Card  className={"border border-dark bg-secondary text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/>Customer List</Card.Header>
                <Card.Body>
                    <Table  bordered hover striped responsive  className={"text-white"}>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Customer Name</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Contact No</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.customers.lenght===0 ?
                                <tr align="center">
                                    <td colSpan="6">No Data Available</td>
                                </tr> :
                                this.state.customers.map((customer)=>(
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.fname+" "+customer.mname+" "+customer.lname}</td>
                                        <td>{customer.gender}</td>
                                        <td>{customer.address+","+customer.city+", "+customer.post+", "+customer.taluka+","+customer.district+","+customer.pin}</td>
                                        <td>{customer.contactno+"/"+customer.altercontact}</td>
                                        <td>{customer.email}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size="sm" className={"btn-success sm"} ><FontAwesomeIcon icon={faEdit}/></Button>{' '}
                                                <Button size="sm" className={"btn-danger"}><FontAwesomeIcon icon={faTrash}/></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Card.Body>

            </Card>
        )
    }
}
export default AllCustomer