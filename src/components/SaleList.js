import React, { Component } from 'react';
import Footer from './Footer/Footer'

import axios from 'axios'

class SaleList extends Component {
constructor(){
    super()
    this.state={
        sale:null
         }
        }


componentWillMount(){
            axios.get('/api/getAllSales')
            .then((response)=>{
              this.setState(
                  {sale:response.data}
              )
            }
            )
            .catch(function(error){
                console.log(error);
            })
        }



        render(){
            console.log(this.state.sale)

            if (this.state.sale) {
                var saleCard = this.state.sale.map((val, index)=>(
                    
                     <div key={index}>
                         <p>{val.sale_name}</p>
                         <p>{val.start_time}</p>
                         <p>{val.end_time}</p> 
                     </div>
                ))
            }
            
            return (
            <div>
                {saleCard}
            </div>
            )
        }
}

export default SaleList;