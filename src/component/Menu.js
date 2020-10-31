import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Col, ListGroup, Row} from 'reactstrap';
import './../App.css'
//import Billing from './Billing';
class Menu extends Component{
    render()
    {
        return(
            <div sm={12} className="block-example sidebar-fixed d-flex hoverable border border-secondary">
               
                    <Row>
                        <Col md={12} lg={12} sm={12}>
                        <div className="   border  block-example">
            <ListGroup className="list-group-flush">
            <NavLink 
                className="list-group-item disabled font-weight-bold text-center text-white bg-primary" 
                color="success" 
                tag="a" 
                to="/" 
                activeClassName="activeClass">
                     <FontAwesomeIcon icon={faUserEdit}/>
                     <h3>DASHBOARD</h3>
            </NavLink>
            <NavLink className="list-group-item list-group-item-action    hoverable "  tag="a" to="/dashboard/billing" activeClassName="activeClass" >Daily Billing</NavLink>
            <NavLink className="list-group-item list-group-item-action " tag="a" to="/dashboard/CreatePanel" activeClassName="activeClass" >Create Panel</NavLink>
            <NavLink className="list-group-item list-group-item-action " tag="a" to="!#" activeClassName="active_class">Settings</NavLink>
            <NavLink className="list-group-item list-group-item-action " tag="a" to="!#" activeClassName="active_class">Report</NavLink>
            <NavLink className="list-group-item list-group-item-action " tag="a" to="!#" activeClassName="active_class">Dapibus ac facilisis in</NavLink>
            
            </ListGroup>
       
            </div>
            </Col>
            </Row>
            
           
    </div>
        );
    }
}
export default Menu