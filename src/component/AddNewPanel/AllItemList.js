import React, { Component } from 'react'
import { ButtonGroup, Card, Table ,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import base_url from './../../Service/RestApi'
import { faList,faEdit } from '@fortawesome/free-solid-svg-icons';
class AllItemList extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            items:[]
        };
    }
    componentDidMount()
    {
        this.findAllItems();
    }
    findAllItems()
    {
        // axios.get(`${base_url}/customers`)
        // .then(response=>response.data)
        // .then((data)=>{this.setState({customers:data})});
    }
    render() {
        return (
            <Card  className={"border border-dark bg-secondary text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/>Item List</Card.Header>
                <Card.Body>
                    <Table  bordered hover striped responsive  className={"text-white"}>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Itme Name</th>
                                <th>HSN Code</th>
                                <th>Purity</th>
                                <th>Gross Weight</th>
                                <th>Other Weight</th>
                                <th>Gold Rate</th>
                                <th>Labour Charges</th>
                                <th>Other Charges</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.lenght===0 ?
                                <tr align="center">
                                    <td colSpan="6">No Data Available</td>
                                </tr> :
                                
                                this.state.items.map((item)=>(
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.itemname}</td>
                                        <td>{item.hsncode}</td>
                                        <td>{item.purity}</td>
                                        <td>{item.grossweight}</td>
                                        <td>{item.otherweight}</td>
                                        <td>{item.rate}</td>
                                        <td>{item.labourcharges}</td>
                                        <td>{item.othercharges}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size="sm" className={"btn-success sm"} ><FontAwesomeIcon icon={faEdit}/></Button>
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
export default AllItemList
