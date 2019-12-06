export default (state = {}, action) => {
    switch (action.type) {
     case 'STORE_DEFINITIONS':
      return action.definitions
     default:
      return state
    }
   }