export default (state = {}, action) => {
    switch (action.type) {
     case 'STORE_PRACTICE_CORRECT_COUNT':
      return {
          count: action.count
      }
     default:
      return state
    }
   }