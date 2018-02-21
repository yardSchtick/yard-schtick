import React, { Component } from 'react';
import axios from 'axios';
import Footer from '../components/Footer/Footer';
import { connect } from 'react-redux';
import { GETURL } from '../Duck/redux';



class InventoryList extends Component {
    constructor(){
        super()
        this.state={
            inventory:null
             }
            }
    
    
    componentWillMount(){
        axios.get('/api/InventoryList/:id', {
            params: {
              id: 1
            }
          })
                .then((response)=>{
                    console.log(response)
                //   this.setState(
                //       {inventory:response.data}
                //   )
                }
                )
                .catch(function(error){
                    console.log(error);
                })
                // console.log(this.props.match.url)
                // this.props.GETURL(this.props.match.url)
            }
    
    
    
            render(){
            //     console.log(this.state.sale)
    
            //     if (this.state.sale) {
            //         var saleCard = this.state.sale.map((val, index)=>(
                        
            //              <div key={index}>
            //                  <p>{val.sale_name}</p>
            //                  <p>{val.sale_description}</p>
            //                  <p>{val.start_time}</p>
            //                  <p>{val.end_time}</p> 
            //              </div>
            //         ))
            //     }
                
                return (
                <div>
                    This is the Inventory for a sale
                    {/* {saleCard} */}
                </div>
                )
            // }
    }
}

export default InventoryList;

