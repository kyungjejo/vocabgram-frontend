import React from 'react';

import styled from 'styled-components'
import './index.css';
import ActivityBar from '../components/ActivityBar';
import Video from '../components/Video';

import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

const Container = styled.div`
    min-width: 60%;
    max-width: 80%;
    margin: 16px auto;
`

const FlexDiv = styled.div`
    display: flex;
    justify-content: center !important;
`

const StyledDiv = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: 800;
`

const mapStateToProps = state => ({
    ...state
})

class Practice extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            offsetTime: 5,
            vIndex: -1,
            wIndex: -1,
            answer: 0,
            len: false,
        }
        this.incOffset = this.incOffset.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.videoIndex.index !== this.props.videoIndex.index) {
            const { dummyWords, dummyVideos, wordIndex } = this.props;
            let wIndex = Math.floor(Math.random() * Object.keys(dummyWords).length)
            if ( wordIndex.index === wIndex) {
                if (wIndex > 0) wIndex -= 1
                else wIndex += 1
            } 
            let vIndex = Math.floor(Math.random() * dummyVideos[wIndex].length) + 1
            let answer = Math.round(Math.random());
            this.setState({
                wIndex: wIndex,
                vIndex: vIndex,
                answer: answer,
                len: Object.keys(dummyVideos).length > 0,
            })
        }
    }

    componentDidMount() {
        const { dummyVideos, dummyWords, wordIndex } = this.props;
        let wIndex = Math.floor(Math.random() * Object.keys(dummyWords).length)
        if ( wordIndex.index === wIndex) {
            if (wIndex > 0) wIndex -= 1
            else wIndex += 1
        } 
        let vIndex = Math.floor(Math.random() * dummyVideos[wIndex].length) + 1
        let answer = Math.round(Math.random());
        this.setState({
            wIndex: wIndex,
            vIndex: vIndex,
            answer: answer,
            len: Object.keys(dummyVideos).length > 0
        })
    }

    incOffset() {
        const { offsetTime } = this.state;
        this.setState({offsetTime: offsetTime + 5});
    }

    render() {
        const { offsetTime, answer, wIndex, vIndex, len } = this.state;
        const { videoIndex, videos, wordIndex, words, questionMode, dummyVideos, dummyWords } = this.props;
        return (
            <Container className="video-container">
                <FlexDiv>
                    <div>
                        <StyledDiv>Video A</StyledDiv>
                        {   wIndex > -1 && vIndex > -1 && len ?
                            <Video
                                offsetTime={offsetTime}
                                targetTime={ wIndex > -1 && vIndex > -1 && len && answer===0 ? videos[wordIndex.index][videoIndex.index][2] : dummyVideos[wIndex][vIndex][2] }
                                youtubeId={ wIndex > -1 && vIndex > -1 && len && answer===0 ? videos[wordIndex.index][videoIndex.index][0] : dummyVideos[wIndex][vIndex][0] }
                                sentNum={ wIndex > -1 && vIndex > -1 && len && answer===0 ? videos[wordIndex.index][videoIndex.index][1] : dummyVideos[wIndex][vIndex][1] }
                                word={ wIndex > -1 && vIndex > -1 && len && answer===0 ? words[wordIndex.index] : dummyWords[wIndex] }
                                type="practice"
                            />
                            :
                            <Dimmer><Loader active /></Dimmer>
                        }
                    </div>
                    <div>
                        <StyledDiv>Video B</StyledDiv>
                        {
                            wIndex > -1 && vIndex > -1 && len ?
                                <Video
                                    offsetTime={offsetTime}
                                    targetTime={ wIndex > -1 && vIndex > -1 && len && answer===1 ? videos[wordIndex.index][videoIndex.index][2] : dummyVideos[wIndex][vIndex][2] }
                                    youtubeId={ wIndex > -1 && vIndex > -1 && len && answer===1 ? videos[wordIndex.index][videoIndex.index][0] : dummyVideos[wIndex][vIndex][0] }
                                    sentNum={ wIndex > -1 && vIndex > -1 && len && answer===1 ? videos[wordIndex.index][videoIndex.index][1] : dummyVideos[wIndex][vIndex][1] }
                                    word={ wIndex > -1 && vIndex > -1 && len && answer===1 ? words[wordIndex.index] : dummyWords[wIndex] }
                                    type="practice"
                                />
                            :
                            <Dimmer><Loader active /></Dimmer>
                        }
                    </div>
                </FlexDiv>
                <ActivityBar answer={answer} questionMode={questionMode} type="practice" word={words[wordIndex.index]} incOffset={this.incOffset}/>
                {/* <ActivityBar mode={0} type="practice" /> */}
            </Container>
        )
    }
}

export default connect(mapStateToProps)(Practice);