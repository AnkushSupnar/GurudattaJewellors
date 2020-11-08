import React, { Component } from 'react'
import '../index.css'
import { Navbar, Nav, NavDropdown, FormControl, Form, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
class NavBar extends Component {
    render() {
        return (
            <Navbar bg="primary" expand="lg" variant="dark" className="bg-primary text-white">
                <Navbar.Brand href="">Gurudatta Jewellers </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink activeClassName="active_class text-white" to="/dashboard/billing" className="nav-link">Daily Billing</NavLink>
                        <NavLink activeClassName="active_class" to="/dashboard/CreatePanel" className="nav-link">Create</NavLink>
                        <NavLink activeClassName="active_class" to="!#" className="nav-link">Setting</NavLink>
                        <NavLink activeClassName="active_class" to="!#" className="nav-link">Report</NavLink>
                        <NavLink activeClassName="active_class" to="!#" className="nav-link">Setting</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}

export default NavBar