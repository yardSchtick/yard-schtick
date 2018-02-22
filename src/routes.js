import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import MapView from './components/MapView';
import Login from './components/Login/Login';
import CreateAccount from './components/Login/CreateAccount';
import SaleList from './components/SaleList';
import ProfileView from './components/ProfileView/ProfileView';
import AddNewSale from './components/AddNewSale';
import AddInventory from './components/AddInventory';
import InventoryList from './components/InventoryList';
import SaleReview from './components/SaleReview';
import ThankYou from './components/ThankYou'
import EditProfile from './components/ProfileView/EditProfile/EditProfile'
import EditSale from './components/ProfileView/EditSale/EditSale'


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
              <Route component={ AddNewSale } path="/AddNewSale" />
              <Route component={ AddInventory } path="/AddInventory" />
              <Route component={ InventoryList } path="/InventoryList" />
              <Route component={ SaleReview } path="/SaleReview" />
              <Route component={ ThankYou } path="/ThankYou" />
              <Route component={EditProfile} path="/EditProfile" />
              <Route component={ EditSale } path = "/EditSale" />

                <Redirect to='/MapView' />
            </Switch>
            </div>
        )
    }
}