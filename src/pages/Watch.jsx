import React from 'react';

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

class Watch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            offsetTime: 5,
        }
        this.incOffset = this.incOffset.bind(this);
    }

    incOffset() {
        const { offsetTime } = this.state;
        this.setState({offsetTime: offsetTime + 5});
    }

    render() {
        const { offsetTime } = this.state;
        const { videoIndex, videos, wordIndex, words } = this.props;
        return (
            <Container className="video-container">
                <Video
                    offsetTime={offsetTime}
                    targetTime={videos[wordIndex.index][videoIndex.index][2]}
                    youtubeId={videos[wordIndex.index][videoIndex.index][0]}
                    sentNum={videos[wordIndex.index][videoIndex.index][1]}
                    word={words[wordIndex.index]}
                    type="watch"
                />
                <ActivityBar mode={videoIndex.index<2} type="watch" word={words[wordIndex.index]} incOffset={this.incOffset}/>
            </Container>
        )
    }
}

export default connect(mapStateToProps)(Watch)