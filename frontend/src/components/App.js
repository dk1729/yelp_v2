import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Landing from './Landing/Landing';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Profile from './Profiles/Profile';
import updateprofile from './Profiles/updateprofile';
import addphoto from './Photos/addphoto';
import addRestPhotos from './Photos/addRestPhotos';
import RestSignup from './Signup/RestSignup';
import RestLogin from './Login/RestLogin';
import RestProfile from './Profiles/RestProfile';
import updateRestProfile from './Profiles/updateRestProfile';
import AddDish from './Dish/AddDish';
import updateDish from './Dish/updateDish';
import restaurants from './UserPages/restaurants';
import biz from './UserPages/biz';
import cart from './UserPages/cart';
import viewRestOrders from './Orders/viewRestOrders';
import OrderHistory from './Orders/OrderHistory';
import ExternalUserProfile from './Events/ExternalUserProfile';
import ShowReviews from './Reviews/ShowReviews';
import ShowPastReviews from './Reviews/ShowPastReviews';
import RestEvents from './Events/RestEvents';
import ShowEvents from './Events/ShowEvents';

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <div>                  
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/updateprofile" component={updateprofile}/>
          <Route path="/addPhoto" component={addphoto}/>
          <Route path="/restSignup" component={RestSignup}/>
          <Route path="/restlogin" component={RestLogin}/>
          <Route path="/restprofile" component={RestProfile}/>
          <Route path="/updateRestProfile" component={updateRestProfile}/>
          <Route path="/addDish" component={AddDish}/>
          <Route path="/updateDish" component={updateDish}/>
          <Route path="/restaurants" component={restaurants}/>
          <Route path="/biz" component={biz}/>
          <Route path="/cart" component={cart}/>
          <Route path="/rest_orders" component={viewRestOrders}/>
          <Route path="/orderHistory" component={OrderHistory}/>
          <Route path="/extUserProfile" component={ExternalUserProfile}/>
          <Route path="/showReviews" component={ShowReviews}/>
          <Route path="/showPastReviews" component={ShowPastReviews}/>
          <Route path="/restEvents" component={RestEvents}/>
          <Route path="/showEvents" component={ShowEvents}/>
          <Route path="/addrestphotos" component={addRestPhotos}/>
        </div>
      </BrowserRouter>
    );
  }
};

export default App;