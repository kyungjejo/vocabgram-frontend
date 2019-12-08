export const storeUserID = ID => ({
    type: 'STORE_USER_ID',
    ID
})

export const storeWords = words => ({
    type: 'STORE_WORDS',
    words
})

export const storePseudowords = words => ({
    type: 'STORE_PSEUDOWORDS',
    words
})

export const storeVideos = videos => ({
    type: 'STORE_VIDEOS',
    videos
})

export const storeDefinitions = definitions => ({
    type: 'STORE_DEFINITIONS',
    definitions
})

export const updateWordIndex = index => ({
    type: 'UPDATE_WORD_INDEX',
    index
})

export const updateVideoIndex = index => ({
    type: 'UPDATE_VIDEO_INDEX',
    index
})

export const updateMode = mode => ({
    type: 'UPDATE_MODE',
    mode
})

export const storeDummy = dummyDefinitions => ({
    type: 'STORE_DUMMY',
    dummyDefinitions
})

export const storePracticeIndex = _index => ({
    type: 'STORE_PRACTICE_INDEX',
    _index
})

export const storePracticeCorrectCount = count => ({
    type: 'STORE_PRACTICE_CORRECT_COUNT',
    count
})

export const storeDummyWords = words => ({
    type: 'STORE_DUMMY_WORDS',
    words
})

export const storeDummyVideos = words => ({
    type: 'STORE_DUMMY_VIDEOS',
    words
})