import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import TransitionGroup from 'react-transition-group'

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
import EditThankYou from './components/EditThankYou';

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

export default class Routes extends Component {
    render() {
        return (
            <div>
            <Switch>
        
              <Route 
                exact path="/MapView" 
                children={({ match, ...rest }) => (
                    <TransitionGroup component={firstChild}>
                    {match && <MapView {...rest} />}
                    </TransitionGroup>
                )}/>
                <Route 
                exact path="/SaleList" 
                children={({ match, ...rest }) => (
                    <TransitionGroup component={firstChild}>
                    {match && <SaleList {...rest} />}
                    </TransitionGroup>
                )}/>
              {/* <Route component={ SaleList } path="/SaleList" /> */}
              <Route component={ Login } path="/Login"/>
              <Route component={ ProfileView } path="/ProfileView" />
              <Route component={ AddNewSale } path="/AddNewSale" />
              <Route component={ AddInventory } path="/AddInventory" />
              <Route component={ InventoryList } path="/InventoryList" />
              <Route component={ SaleReview } path="/SaleReview" />
              <Route component={ ThankYou } path="/ThankYou" />
              <Route component={ SaleDesc } path='/SaleDescription' />
              <Route component={ EditThankYou } path = "/EditThankYou" />

                <Redirect to='/MapView' />
            </Switch>
            </div>
        )
    }
}
