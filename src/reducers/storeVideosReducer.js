export default (state = {}, action) => {
    switch (action.type) {
     case 'STORE_VIDEOS':
      return action.videos
     default:
      return state
    }
   }