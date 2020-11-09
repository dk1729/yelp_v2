import React, { Component } from 'react'
import InternalRestHeader from '../Headers/InternalRestHeader'
import {Button} from 'semantic-ui-react';
import {Field, Form, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import axios from 'axios';
import {fetchMessages} from '../../actions';

class Chat extends Component {

  componentDidMount(){
    this.props.fetchMessages('c1');
  }

  renderInput = ({input, type, placeholder}) => {
    return (
      <div className="field" style={{width:"500px", float:"left"}}>
        <input className="shadow p-3 mb-5 rounded" {...input} type={type} style={{marginTop:25}} placeholder={placeholder}/>
      </div>
    );
  }

  onSubmit = formValues => {
    console.log({formValues, side:"rest", chat_id:"c1"})
    axios.post('http://localhost:3001/sendmessage',{...formValues, side:"rest", chat_id:"c1"})
      .then(response => {
        console.log("Status Code : ",response.status);
      })
  }

  render() {

    let chats = null;

    if(this.props.chats.chats.length !== undefined){
      chats = this.props.chats.chats.map(chat => {
        if(chat.side === "rest"){
          return (
            <div style={{textAlign:"left", width:"max-content", margin:"0 0", padding:"0 0", background:"#d32323", color:"white"}}>
              {chat.messageTerm}
            </div>
          )
        }
        else{
          return (
            <div style={{textAlign:"right", background:"gray", color:"black"}}>
              {chat.messageTerm}
            </div>
          )
        }
      })
    }
    return (
      <div>
        <InternalRestHeader/>
          <Form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field  component={this.renderInput} name="messageTerm" placeholder="Enter Message"/>
              <Button style={{background:"#d32323", color:"white", marginTop:30, marginLeft:30}} onClick={this.onSubmit}>Send</Button>
          </Form>          
          {chats}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {chats:state.chats}
}

export default reduxForm({form:'chat'})(connect(mapStateToProps,{fetchMessages})(Chat));