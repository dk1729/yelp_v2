import React from 'react';
import InternalRestHeader from '../Headers/InternalRestHeader';
import axios from 'axios';
import {baseURL} from '../URLConfig';

class addRestPhotos extends React.Component {
  state = {photos:''}

  addPhotos = event => {
    this.setState({photos:event.target.files})
  }

  uploadPhotos = event => {
    event.preventDefault();

    var formData = new FormData();
    for (const key of Object.keys(this.state.photos)) {
        formData.append('images', this.state.photos[key])
    }
    formData.append('rest_id', window.localStorage.getItem('rest_id'));        

    axios.defaults.withCredentials = true;
    axios.post(`${baseURL}/uploadRestImages`, formData)
      .then(res => {
        console.log(res)
      })
  }
  
  render() {
    console.log(this.state)
    return (
      <div>
        <InternalRestHeader/>
        <input type="file" onChange = {this.addPhotos} multiple/>
        <button onClick={this.uploadPhotos}>Add photos</button>
      </div>
    )    
  }
}

export default addRestPhotos;