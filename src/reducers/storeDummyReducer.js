export default (state = {}, action) => {
    switch (action.type) {
     case 'STORE_DUMMY':
      return action.dummyDefinitions
     default:
      return state
    }
   }