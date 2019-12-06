export default (state = {}, action) => {
    switch (action.type) {
     case 'UPDATE_WORD_INDEX':
      return {
        index: action.index
      }
     default:
      return state
    }
   }