export default (state={chats:[]}, action) => {
  switch(action.type){
    case 'FETCH_CHATS':
      return {...state, chats:action.payload}
    default:
      return state;
  }
};