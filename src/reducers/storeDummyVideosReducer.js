export default (state = {}, action) => {
    switch (action.type) {
     case 'STORE_DUMMY_VIDEOS':
      return action.words
     default:
      return state
    }
   }