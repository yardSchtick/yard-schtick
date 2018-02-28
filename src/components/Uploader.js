import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'


class Uploader extends Component {
    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", `yardschtick`);
          formData.append("upload_preset", "xaytd9ya"); // Replace the preset name with your own
          formData.append("api_key", "744751991133399");
          formData.append("public_id", `id ${this.props.id}`);
          
          
          return axios.post("https://api.cloudinary.com/v1_1/dqval3kpy/image/upload", formData)
          .then(response => {
            const data = response.data;
            const fileURL = data.secure_url // You should store this URL for future references in your app
            console.log(data);
            console.log(fileURL)
          })
        });
      
        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
          alert('image was uploaded')
        });
      }

    render(){
      console.log(this.user)
        return (
          <div>
            <Dropzone onDrop={this.handleDrop} multiple accept="image/*">
                        <p>Drop your files or click here to upload</p>
                </Dropzone>
                
          </div>


        )
    }
}

export default Uploader; 