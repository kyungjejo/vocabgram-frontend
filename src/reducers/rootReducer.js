import { combineReducers } from 'redux';

import words from './storeWordsReducer';
import videos from './storeVideosReducer';

import videoIndex from './updateVideoIndexReducer';
import wordIndex from './updateWordIndexReducer';
import definitions from './storeDefinitionReducer';

import userid from './storeUserIdReducer';
import questionMode from './updateModeReducer';
import dummy from './storeDummyReducer';

export default combineReducers({
    words,
    videos,
    definitions,
    videoIndex,
    wordIndex,
    userid,
    questionMode,
    dummy,
});