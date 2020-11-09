import React, { Component } from 'react'
import InternalHeader from '../Headers/InternalHeader'
import {Input, Button} from 'semantic-ui-react';
import {Field, Form, reduxForm} from 'redux-form';
import axios from 'axios';

class ChatUser extends Component {

  renderInput = ({input, type, placeholder}) => {
    return (
      <div className="field" style={{width:"500px", float:"left"}}>
        <input className="shadow p-3 mb-5 rounded" {...input} type={type} style={{marginTop:25}} placeholder={placeholder}/>
      </div>
    );
  }

  onSubmit = formValues => {
    console.log({formValues, side:"user", chat_id:"c1"})
    axios.post('http://localhost:3001/sendmessage',{...formValues, side:"user", chat_id:"c1"})
      .then(response => {
        console.log("Status Code : ",response.status);
      })
  }

  render() {
    return (
      <div>
        <InternalHeader/>
          <Form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field  component={this.renderInput} name="messageTerm" placeholder="Enter Message"/>
              <Button style={{background:"#d32323", color:"white", marginTop:30, marginLeft:30}} onClick={this.onSubmit}>Send</Button>
          </Form>          
      </div>
    )
  }
}

export default reduxForm({form:'chat'})(ChatUser);