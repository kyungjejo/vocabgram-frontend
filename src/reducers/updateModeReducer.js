export default (state = false, action) => {
    switch (action.type) {
     case 'UPDATE_MODE':
      return action.mode
     default:
      return state
    }
   }