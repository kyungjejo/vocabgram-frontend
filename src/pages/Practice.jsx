import React from 'react';

import styled from 'styled-components'
import './index.css';
import ActivityBar from '../components/ActivityBar';
import Video from '../components/Video';

const Container = styled.div`
    min-width: 60%;
    max-width: 80%;
    margin: 16px auto;
`

const FlexDiv = styled.div`
    display: flex;
`

export default class Watch extends React.Component{

    render() {
        return (
            <Container className="video-container">
                <FlexDiv>
                <Video
                    offsetTime={5}
                    targetTime={100}
                    youtubeId="9bVozM2YXvI"
                    type="practice"
                />
                <Video
                    offsetTime={5}
                    targetTime={100}
                    youtubeId="9bVozM2YXvI"
                    type="practice"
                />
                </FlexDiv>
                <ActivityBar mode={0} type="practice" />
            </Container>
        )
    }
}