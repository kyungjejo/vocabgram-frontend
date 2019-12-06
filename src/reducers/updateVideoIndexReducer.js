export default (state = {}, action) => {
    switch (action.type) {
     case 'UPDATE_VIDEO_INDEX':
      return {
        index: action.index
      }
     default:
      return state
    }
   }