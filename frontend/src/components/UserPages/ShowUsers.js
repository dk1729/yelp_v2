import React, { Component } from 'react'
import InternalHeader from '../Headers/InternalHeader'
import {Row, Col} from 'react-bootstrap';
import {Form, Button, Card, Input } from 'semantic-ui-react';
import {fetchUsers} from '../../actions';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class ShowUsers extends Component {
  state = {searchTerm:"", cards:[], modalShow:false, message:"", show:false}

  componentDidMount(){
    this.props.fetchUsers(window.localStorage.getItem('id'));
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("Hola ")
  }

  handleChange = event => {
    this.setState({searchTerm:event.target.value})
  }

  render() {
    console.log("Props = ")
    console.log(this.props)
    var user_cards = null

    if(this.props.users.users.length!==undefined){
      user_cards = this.props.users.users.map(user => {

        if(user._id !== window.localStorage.getItem('id')){
          return (
            <Card className="shadow-sm p-3 mb-5 rounded">
              <Card.Content>
                <Link to={{pathname:"/extUserProfile", state:{user_details:user}}}><Card.Header>{user.first_name} {user.last_name}</Card.Header></Link>
                <Card.Meta>{user.email}</Card.Meta>
                <Card.Description>
                  Yelping Sinc: {user.yelping_since}
                </Card.Description>
              </Card.Content>
              <Card.Content>
                Birth Date: {user.birthdate.substring(0,10)}
              </Card.Content>            
            </Card>
          ) 
        }         
      })
    }

    return (
      <div>
        <InternalHeader/>
        <Row style={{marginTop:20}}>
          <Col md={2}>
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}  style={{marginLeft:20}}>
                  <Input icon='calendar' iconPosition='left' value={this.state.searchTerm} placeholder='Search users...' onChange={this.handleChange}/>
                </Form>
              </Col>  
            </Row>
            <Row>
              <Col>
                <Button color="red" style={{marginLeft:20, marginTop:10}} onClick = {()=>console.log("Holi")}>Show Following </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Card.Group>
              {user_cards}  
            </Card.Group>
          </Col>
        </Row>
      </div>
    )
  }
}


const mapStateToProps = (state) =>{
  return {users:state.users, isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps, {fetchUsers})(ShowUsers);