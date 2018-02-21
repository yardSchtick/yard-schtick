import React, { Component } from 'react';
import axios from 'axios'
import Footer from '../components/Footer/Footer';
import { connect } from 'react-redux';
import {GETURL} from '../Duck/redux'

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
            console.log(this.props.match.url)
            this.props.GETURL(this.props.match.url)
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

function mapStateToProps(state) {}

export default connect(mapStateToProps, {GETURL})(SaleList)