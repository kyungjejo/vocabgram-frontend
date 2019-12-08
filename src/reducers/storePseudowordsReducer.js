export default (state = {}, action) => {
    switch (action.type) {
     case 'STORE_PSEUDOWORDS':
      return action.words
     default:
      return state
    }
   }