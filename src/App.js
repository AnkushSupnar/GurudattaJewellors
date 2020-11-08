import React from 'react';
import './App.css';
import Login from './component/Login'
import Home from './component/Home'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Dashboard from './component/Dashboard';
import CreatePanel from './component/AddNewPanel/CreatePanel';
import Billing from './component/Billing';
import Billing2 from './component/Billing2'
import { Col, Row } from 'reactstrap';
import AddNewCustomer from './component/AddNewPanel/AddNewCustomer';
import EditCustomer from './component/AddNewPanel/EditCustomer'
import AllCustomer from './component/AddNewPanel/AllCustomer'
import AddNewItem from './component/AddNewPanel/AddNewItem';
import AllItemList from './component/AddNewPanel/AllItemList'
import NavBar from './component/NavBar'

function App() {

  return (
    <div className="flexible-content">

      <Router>
        <NavBar />
        <Route path="/" exact component={Home} />
        <Route path="/Login" exact component={Login} />


        <Route path="/dashboard" component={Dashboard} />


        <Route path="/dashboard/billing" component={Billing2} />
        <Route path="/dashboard/CreatePanel" component={CreatePanel} />
        <Route path="/dashboard/addnewcustomer" exact component={AddNewCustomer} />
        <Route path="/dashboard/editcustomer" component={EditCustomer} />
        <Route path="/dashboard/allcustomers" component={AllCustomer} />
        <Route path="/dashboard/addnewitem" component={AddNewItem} />
        <Route path="/dashboard/allitems" component={AllItemList} />

      </Router>
    </div>
  );
}

export default App;
