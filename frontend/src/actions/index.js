import Axios from "axios";
import {baseURL} from '../components/URLConfig';
export const signIn = () => {
  return {
    type:'SIGN_IN'
  }
};

export const restSignIn = () => {
  return {
    type:'REST_SIGN_IN'
  }
};

export const signOut = () => {
  return {
    type:'SIGN_OUT'
  }
};

export const restSignOut = () => {
  return {
    type:'REST_SIGN_OUT'
  }
};

export const signUpSuccess = () => {
  return {
    type:'SIGN_UP_SUCCESSFUL'
  }
};

export const signUpFail = () => {
  return {
    type:'SIGN_UP_UNSUCCESSFUL'
  }
};

export const restSignUpSuccess = () => {
  return {
    type:'REST_SIGN_UP_SUCCESSFUL'
  }
};

export const restSignUpFail = () => {
  return {
    type:'REST_SIGN_UP_UNSUCCESSFUL'
  }
};

export const setID = (id) => {
  return{
    type:'SET_ID',
    id
  }
}

export const setRestID = (rest_id) => {
  return{
    type:'SET_REST_ID',
    rest_id
  }
}

export const removeID = () => {
  return{
    type:'REMOVE_ID',
    id:null
  }
}

export const removeRestID = () => {
  return{
    type:'REMOVE_REST_ID',
    rest_id:null
  }
}

export const setSearchTerms = (term, location) => {
  console.log("Gonna find "+term+" and "+location)
  return{
    type:'SET_SEARCH_TERM',
    term,
    location
  }
}

export const setMessageTerm = (term, location) => {
  console.log("Gonna find "+term+" and "+location)
  return{
    type:'SET_MESSAGE_TERM',
    term,
    location
  }
}

export function fetchUserData(id) {
  
  return async (dispatch)=>{
    Axios.defaults.withCredentials = true;
    const response = await Axios.get(`${baseURL}/getData/`+id)
    dispatch({
      type:'FETCH_DATA',
      payload:response.data
    })
  }
}

export function fetchMessages(chat_id) {
  return async (dispatch) => {
    Axios.defaults.withCredentials = true;
    const response = await Axios.get(`${baseURL}/getChats/`+chat_id)
    dispatch({
      type:'FETCH_CHATS',
      payload:response.data
    })
  }
}

export function fetchRestData(rest_id) {
  
  return async (dispatch)=>{
    Axios.defaults.withCredentials = true;
    const response = await Axios.get(`${baseURL}/getRestData/`+rest_id)
    dispatch({
      type:'FETCH_REST_DATA',
      payload:response.data
    })
  }
}

export function fetchDishData(rest_id) {
  return async (dispatch)=>{
    Axios.defaults.withCredentials = true;
    const response = await Axios.get(`${baseURL}/getDishes/`+rest_id)
    dispatch({
      type:'FETCH_DISH_DATA',
      payload:response.data
    })
  }
}

export function fetchRestaurants() {
  return async (dispatch)=>{
    Axios.defaults.withCredentials = true;
    const response = await Axios.get(`${baseURL}/getRestaurants/`)
    dispatch({
      type:'FETCH_RESTAURANTS',
      payload:response.data
    })
  }
}

export function fetchUsers(user_id){
  return async (dispatch)=>{
    Axios.defaults.withCredentials = true;
    const response = await Axios.get(`${baseURL}/getUsers/`+user_id)
    console.log("response = ")
    console.log(response.data)
    dispatch({
      type:'FETCH_USERS',
      payload:response.data
    })
  }
}

export function applyFilters(filters) {
  console.log("Apply these filters: ")
  console.log(filters)

  return async (dispatch)=>{
    Axios.defaults.withCredentials = true;
    const response = await Axios.post(`${baseURL}/filter/`, filters)
    dispatch({
      type:'APPLY_FILTERS',
      payload:response.data
    })
  }
}

export function fetchRestCoords() {
  return async (dispatch)=>{
    Axios.defaults.withCredentials = true;
    const response = await Axios.get(`${baseURL}/getRestCoords/`)
    dispatch({
      type:'FETCH_REST_COORDS',
      payload:response.data
    })
  }
}

export function fetchCart(user_id) {
  console.log("Reached to action")
  return async (dispatch)=>{
    Axios.defaults.withCredentials = true;
    const response = await Axios.get(`${baseURL}/getCart/`+user_id)
    dispatch({
      type:'FETCH_CART',
      payload:response.data
    })
  }
}

export function fetchOrderData(id, type) {  
  return async (dispatch) => {
    Axios.defaults.withCredentials = true;
    const response = await Axios.get(`${baseURL}/getOrders`, {params:{id, type}})
    dispatch({
      type:'FETCH_ORDER_DATA',
      payload:response.data
    })
  }
}

export function fetchReviews(id, type) {
  return async (dispatch) => {
    Axios.defaults.withCredentials = true;
    const response = await Axios.get(`${baseURL}/getReviews`, {params:{id, type}})
    dispatch({
      type:'FETCH_REVIEWS',
      payload:response.data
    })
  }
}

export function fetchEvents() {
  return async (dispatch) => {    
    Axios.defaults.withCredentials = true;
    const response = await Axios.get(`${baseURL}/getEvents`)
    dispatch({
      type:'FETCH_EVENTS',
      payload:response.data
    })
  }
}

export function fetchRestEvents(rest_id) {
  console.log()
  return async (dispatch) => {    
    Axios.defaults.withCredentials = true;
    const response = await Axios.get(`${baseURL}/getRestEvents/`+rest_id)
    dispatch({
      type:'FETCH_REST_EVENTS',
      payload:response.data
    })
  }
}

export function fetchRegisteredEvents(id) {
  console.log("Action called")  
  return async (dispatch) => {
    Axios.defaults.withCredentials = true;
    const response = await Axios.get(`${baseURL}/getRegisteredEvents/`+id)
    dispatch({
      type:'FETCH_REGISTERED_EVENTS',
      payload:response.data
    })
  }
}