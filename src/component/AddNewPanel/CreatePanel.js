import React,{Component} from 'react';
import './../../App.css';
import {Col,Container,Row, Card, CardBody, CardTitle,CardText} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser,faList,faUserEdit,faUserCircle,faGem} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

class CreatePanel extends Component
{
    
    render(){       
        return(
            <div className="create-panel" >
                <ToastContainer/>
                <Container>
                    <Row>
                        <Col md={4}>                       
                        <Card className="bg-success menu-card">
                            <CardBody>
                                <CardTitle>
                                    <h3 className="text-white text-center">
                                        <FontAwesomeIcon icon={faUser}/>   Customer
                                    </h3>
                                </CardTitle>
                            </CardBody>
                            <CardBody>           
                                <CardText my={5}>
                                    <Link  className="text-white" to={"/dashboard/allcustomers"}  > 
                                        <FontAwesomeIcon icon={faList}/>  View All 
                                    </Link>
                                </CardText>
                                <CardText>
                                    <Link  className="text-white" to={"/dashboard/addnewcustomer"}>
                                        <FontAwesomeIcon icon={faUserCircle}/>  Add 
                                    </Link> 
                                </CardText>
                                <CardText >
                                    <Link className="text-white" to={"/dashboard/editcustomer"}> 
                                        <FontAwesomeIcon icon={faUserEdit}/>  Edit 
                                    </Link>
                                </CardText>                          
                            </CardBody>  
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="bg-success">
                            <CardBody>
                                <CardTitle>
                                    <h3 className="text-white text-center">
                                        <FontAwesomeIcon icon={faGem}/>   Item
                                    </h3></CardTitle>
                            </CardBody>                      
                                <CardBody>
                                    <CardText my={5} >
                                        <Link className="text-white" to={"/dashboard/allitems"}> 
                                            <FontAwesomeIcon icon={faList}/>  View All
                                        </Link>
                                    </CardText>
                                    <CardText>
                                        <Link className="text-white" to={"/dashboard/addnewitem"}> 
                                            <FontAwesomeIcon icon={faUserCircle}/>  Add New
                                        </Link>
                                    </CardText>
                                    <CardText>
                                        <Link className="text-white" to={"#!"}>
                                            <FontAwesomeIcon icon={faUserEdit}/>  Edit
                                        </Link>
                                    </CardText>
                                 </CardBody>  
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="bg-success">
                                <CardBody>
                                    <CardTitle>
                                        <h3 className="text-white text-center">
                                            <FontAwesomeIcon icon={faUser}/>   User
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                                <CardBody>
                                <CardText my={5} >
                                    <Link className="text-white" to={"#!"}> 
                                        <FontAwesomeIcon icon={faList}/>  View All
                                    </Link>
                                </CardText>
                                <CardText>
                                    <Link className="text-white" to={"#!"}>
                                        <FontAwesomeIcon icon={faUserCircle}/>  Add New
                                    </Link>
                                </CardText>
                                <CardText>
                                    <Link className="text-white" to={"#!"}> 
                                        <FontAwesomeIcon icon={faUserEdit}/>  Edit
                                    </Link>
                                </CardText>         
                                </CardBody>  
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default CreatePanel