import { combineReducers } from 'redux';

import words from './storeWordsReducer';
import videos from './storeVideosReducer';

import videoIndex from './updateVideoIndexReducer';
import wordIndex from './updateWordIndexReducer';
import definitions from './storeDefinitionReducer';

import userid from './storeUserIdReducer';
import questionMode from './updateModeReducer';
import dummy from './storeDummyReducer';
import practiceIndexes from './storePracticeIndex';
import pseudo from './storePseudowordsReducer';
import correctCount from './storePracticeCorrectCountReducer';
import dummyVideos from './storeDummyVideosReducer';
import dummyWords from './storeDummyWordsReducer';

export default combineReducers({
    words,
    videos,
    definitions,
    videoIndex,
    wordIndex,
    userid,
    questionMode,
    dummy,
    practiceIndexes,
    pseudo,
    correctCount,
    dummyWords,
    dummyVideos,
});