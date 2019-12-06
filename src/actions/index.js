export const storeUserID = ID => ({
    type: 'STORE_USER_ID',
    ID
})

export const storeWords = words => ({
    type: 'STORE_WORDS',
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