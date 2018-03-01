import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import MapView from './components/MapView/MapView';
import Login from './components/Login/Login';
import SaleList from './components/SaleList';
import ProfileView from './components/ProfileView/ProfileView';
import AddNewSale from './components/AddNewSale';
import AddInventory from './components/AddInventory';
import InventoryList from './components/InventoryList';
import SaleReview from './components/SaleReview';
import ThankYou from './components/ThankYou'
import SaleDesc from './components/SaleDesc'


export default class Routes extends Component {
    render() {
        return (
            <div>
            <Switch>
        
              <Route component={ MapView } exact path="/MapView" />
              <Route component={ Login } path="/Login"/>
              <Route component={ SaleList } path="/SaleList" />
              <Route component={ ProfileView } path="/ProfileView" />
              <Route component={ AddNewSale } path="/AddNewSale" />
              <Route component={ AddInventory } path="/AddInventory" />
              <Route component={ InventoryList } path="/InventoryList" />
              <Route component={ SaleReview } path="/SaleReview" />
              <Route component={ ThankYou } path="/ThankYou" />
              <Route component={ SaleDesc } path='/SaleDescription' />

                <Redirect to='/MapView' />
            </Switch>
            </div>
        )
    }
}
