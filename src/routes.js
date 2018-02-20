import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import MapView from './components/MapView';
import Login from './components/Login/Login';
import CreateAccount from './components/Login/CreateAccount';
import SaleList from './components/SaleList';
import ProfileView from './components/ProfileView/ProfileView';
import SaleDuration from './components/SaleDuration';
import AddInventory from './components/AddInventory';
import InventoryList from './components/InventoryList';
import SaleReview from './components/SaleReview';
import ThankYou from './components/ThankYou'


export default class Routes extends Component {
    render() {
        return (
            <div>
            <Switch>
        
              <Route component={ MapView } exact path="/MapView" />
              <Route component={ Login } path="/Login"/>
              <Route component={ CreateAccount } path="/CreateAccount" />
              <Route component={ SaleList } path="/SaleList" />
              <Route component={ ProfileView } path="/ProfileView" />
              <Route component={ SaleDuration } path="/SaleDuration" />
              <Route component={ AddInventory } path="/AddInventory" />
              <Route component={ InventoryList } path="/InventoryList" />
              <Route component={ SaleReview } path="/SaleReview" />
              <Route component={ ThankYou } path="/ThankYou" />
        
            </Switch>
            </div>
        )
    }
}