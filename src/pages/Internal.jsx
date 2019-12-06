import React,{ useState } from 'react';

import { useParams } from "react-router-dom";

import styled from 'styled-components'
import './index.css';
import ActivityBar from '../components/ActivityBar';
import Video from '../components/Video';

import { connect } from 'react-redux';

const Container = styled.div`
    min-width: 60%;
    max-width: 80%;
    margin: 16px auto;
`

const mapStateToProps = state => ({
    ...state
})

// function useQuery() {
//     return new URLSearchParams(useLocation().search);
//   }  

function Internal(props){
    const [ offsetTime, setOffsetTime ] = useState(5)

    function incOffset() {
        setOffsetTime(offsetTime+5)
    }

    // let query = new URLSearchParams(useLocation().search);
    let { time, wordIndex, videoIndex, word, youtubeId, unique } = useParams();
    console.log(useParams())
    // const { videoIndex, videos, wordIndex, words, questionMode } = props;

    return (
        <Container className="video-container">
            <Video
                offsetTime={offsetTime}
                targetTime={time}
                youtubeId={youtubeId}
                sentNum={unique}
                word={word}
                type="watch"
            />
            <ActivityBar mode={videoIndex<2} type="watch" word={word} incOffset={incOffset}/>
        </Container>
    )
}

export default connect(mapStateToProps)(Internal);