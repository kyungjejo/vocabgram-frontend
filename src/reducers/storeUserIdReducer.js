export default (state = {}, action) => {
    switch (action.type) {
     case 'STORE_USER_ID':
      return action.ID
     default:
      return state
    }
   }