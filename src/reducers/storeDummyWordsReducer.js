export default (state = {}, action) => {
    switch (action.type) {
     case 'STORE_DUMMY_WORDS':
      return action.words
     default:
      return state
    }
   }