export default (state = {}, action) => {
    switch (action.type) {
     case 'STORE_PRACTICE_INDEX':
      return action._index
     default:
      return state
    }
   }