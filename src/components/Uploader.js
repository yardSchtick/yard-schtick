import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { connect } from 'react-redux'
import { addSaleImage } from '../Duck/redux'


class Uploader extends Component {
    constructor(props) {
      super(props)
      this.state = {
        sale_img: null
      }
    }

    
    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", `yardschtick`);
          formData.append("upload_preset", "xaytd9ya"); 
          formData.append("api_key", "744751991133399");
          // formData.append("unique_filename", "true");
          
          
          return axios.post("https://api.cloudinary.com/v1_1/dqval3kpy/image/upload", formData)
          .then(response => {
            const data = response.data;
            const fileURL = data.secure_url // You should store this URL for future references in your app
            this.setState({ sale_img: fileURL })
            
          })
        });
      
        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
          alert('image was uploaded')
          this.props.addSaleImage( this.state.sale_img )
        });
      }

    render(){
      
        return (
          <div>
            <Dropzone className="itemPic" onDrop={ this.handleDrop } multiple accept="image/*">
                        <div className="glyphicon glyphicon-upload">
                            <p className="uploaderText">Click to Upload</p>
                        </div>
            </Dropzone>
                
          </div>


        )
    }
}

function mapStateToProps(state){ return {
   newSale: state.newSale
}}

export default connect(mapStateToProps, {addSaleImage}) (Uploader); 