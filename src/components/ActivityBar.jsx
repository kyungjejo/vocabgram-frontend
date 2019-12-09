import React, { useState } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import styled from 'styled-components'
import WordCard from '../components/WordCard';
import MultipleChoice from '../components/MultipleChoice';
import {withRouter} from 'react-router';

import { connect } from 'react-redux';
import { updateVideoIndex, updateWordIndex, updateMode, 
    storeVideos, storePracticeIndex, storePracticeCorrectCount } from '../actions';

const StyledSegment = styled(Segment)`
    min-width: 60%;
    max-width: 860px;
    margin: auto !important;
`

const StyledP = styled.p`
    margin: 0 0 3px
`

const StyledDiv = styled.div`
    display: inline-flex
`

const StyledSpan = styled.div`
    margin: 12px 0;
`

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    updateVideoIndex: (index) => dispatch(updateVideoIndex(index)),
    storeVideos: (videos) => dispatch(storeVideos(videos)),
    updateWordIndex: (index) => dispatch(updateWordIndex(index)),
    updateMode: (mode) => dispatch(updateMode(mode)),
    storePracticeIndex: (index) => dispatch(storePracticeIndex(index)),
    storePracticeCorrectCount: (count) => dispatch(storePracticeCorrectCount(count)),
})

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function ActivityBar(props){
    const [ questionOptions, setQuestionOptions ] = useState({});

    const { word, updateVideoIndex, updateWordIndex, updateMode, practiceIndexes, pseudo, videos, storePracticeCorrectCount,
        videoIndex, incOffset, wordIndex, words, answer, correctCount } = props;
    // updateMode(false);
    const wordLearned = (type) => {
        const { word, wordIndex, userid  } = props;
        let _userid;
        if (typeof userid === "object") _userid = Object.values(userid).join('')
        else _userid = userid
        let param = `user=${_userid}&word=${word}&index=${wordIndex.index}`
        fetch(`${process.env.REACT_APP_URL}/word?`+param)
            .then(res=>res.json())
            .then(result => console.log(result))
            .catch(error => console.log('Error! ' + error.message))
    }

    const videoWatched = (type) => {
        const { word, videos, videoIndex, wordIndex, userid  } = props;
        let vid = videos[wordIndex.index][videoIndex.index];
        let _userid;
        if (typeof userid === "object") _userid = Object.values(userid).join('')
        else _userid = userid
        let param = `user=${_userid}&word=${word}&sent_num=${vid[1]}&video_id=${vid[0]}&type=${type}`
        fetch(`${process.env.REACT_APP_URL}/video?`+param)
            .then(res=>res.json())
            .then(result => console.log(result))
            .catch(error => console.log('Error! ' + error.message))
    }

    const incVideoIndex = (type) => {
        // word sent_num video_id type
        videoWatched(type)
        updateVideoIndex(videoIndex.index+1)
    }

    const toQuestionMode = () => {
        const { updateMode, wordIndex, dummy, definitions } = props;
        let defs = [['correct', definitions[wordIndex.index]]]
        for (let i = 1; i < 4; i++) {
            defs.push(['incorrect'+i.toString(), Object.values(dummy).splice(Math.floor(Math.random() * Object.values(dummy).length), 1)[0]]);
        }
        defs = shuffleArray(defs);
        setQuestionOptions(defs);
        updateMode(true);
    }

    const onProceed = () => {
        const next = wordIndex.index < Object.keys(words).length - 1;
        if (next) {
            videoWatched("watch")
            updateWordIndex(wordIndex.index+1);
            updateVideoIndex(0);
        }
        // else  - when there is no more videos to watch.
    }

    function onInferNext(result, type) {
        videoWatched('infer');
        if (result === 'correct') {
            const next = wordIndex.index < Object.keys(words).length - 1;
            // Learn more words
            if (next) {
                practiceIndexes[wordIndex.index] = videoIndex.index+1
                storePracticeIndex(practiceIndexes)
                updateWordIndex(wordIndex.index+1);
                updateVideoIndex(0);
                updateMode(false);  
                wordLearned('infer');
            }
            // go to practice mode
            else {
                storePracticeCorrectCount(0);
                updateWordIndex(0);
                updateVideoIndex(practiceIndexes[0]);
                props.history.push('/practice');
                
            }
        }
        else {
            updateMode(false);
            updateVideoIndex(videoIndex.index+1);
        }
    }

    function onPracticeNext(result, type) {
        videoWatched('practice');
        const next = wordIndex.index < Object.keys(words).length - 1;
        if (result === 'correct') {
            if ( correctCount.count+1 >= 3 ) {
                wordLearned('practice');
                if ( !next ) {
                    props.history.push('/');
                    // update here // it's either there is no more videos, or learners got three or more correct.
                }
                else {
                    updateWordIndex(wordIndex.index+1);
                }
                updateVideoIndex(0);
                storePracticeCorrectCount(0);
            }
            else {
                storePracticeCorrectCount(correctCount.count+1);
                if ( videoIndex.index >= Object.keys(videos[wordIndex.index]).length -1 ) {
                    updateWordIndex(wordIndex.index+1);
                    updateVideoIndex(0);
                    storePracticeCorrectCount(0);
                }
                else {
                    updateVideoIndex(videoIndex.index+1);
                }
            }
        }
        // got more than three correctly
        // no more videos to watch

    }

    return (
        <StyledSegment textAlign="center">
            {
                // Infer & no option to proceed
                props.type === "infer" && props.mode ?
                    <span>
                        <StyledSpan>
                            <StyledP><u>Target Word: {pseudo[wordIndex.index]}</u></StyledP>
                            <StyledP>Focus on learning both <b>the meaning and the use</b> of the word.</StyledP>
                        </StyledSpan>
                        <span>
                            <StyledP>Please watch <b>at least three</b> videos before proceeding to the next stage.</StyledP>
                            <Button onClick={incOffset} color="yellow">Video is too short.</Button>
                            <Button primary onClick={() => incVideoIndex('infer')}>Watch Next Video</Button>
                        </span>
                    </span>
                    :
                // Infer & user may proceed
                props.type === "infer" && !props.mode ?
                    <span>
                        {
                            props.questionMode ?
                            <MultipleChoice onNext={onInferNext} questionOptions={questionOptions} type={"infer"} choice={4}/>
                            :
                            <span>
                                <StyledSpan>
                                    <StyledP><u>Target Word: {pseudo[wordIndex.index]}</u></StyledP>
                                    <StyledP>Focus on learning both <b>the meaning and the use</b> of the word.</StyledP>
                                </StyledSpan>
                                <StyledSpan>
                                    <StyledP>If you feel you're ready, you may test yourself.</StyledP>
                                    <StyledP>Or click "I'm not ready yet" to watch more videos before taking the test.</StyledP>
                                </StyledSpan>
                                <StyledDiv>
                                    <Button onClick={incOffset} color="yellow">Video is too short.</Button>
                                    <Button negative onClick={() => incVideoIndex('infer')}>I'm not ready yet.</Button>
                                    <Button positive onClick={toQuestionMode}>Test Myself!</Button>
                                </StyledDiv>
                            </span>
                        }
                    </span>
                    :
                // Watch & no option to proceed
                props.type === "watch" && props.mode ?
                    <span>
                        <span>
                            <StyledP>Focus on learning both <b>the meaning and the use</b> of the word. </StyledP>
                            <WordCard word={word}/>
                        </span>
                        <span>
                            <StyledP>Please watch <b>at least three</b> videos before proceeding to the next stage.</StyledP>
                            <Button onClick={incOffset} color="yellow">Video is too short.</Button>
                            <Button primary onClick={ () => incVideoIndex('watch') }>Watch Next Video</Button>
                        </span>
                    </span>
                    :
                // Watch & user may proceed
                props.type === "watch" && !props.mode ?
                    <span>
                        <span>
                            <StyledP>Focus on learning both <b>the meaning and the use</b> of the word. </StyledP>
                            <WordCard word={word} />
                        </span>
                        <span>
                            <StyledSpan>
                                <StyledP>If you feel you're ready, you may proceed to the next stage. </StyledP>
                                <StyledP>Or watch more videos before proceeding.</StyledP>
                            </StyledSpan>
                            <StyledDiv>
                                <Button onClick={incOffset} color="yellow">Video is too short.</Button>
                                <Button negative onClick={ () => incVideoIndex('watch') }>I'm not ready yet.</Button>
                                <Button positive onClick={ onProceed }>{ wordIndex.index < Object.keys(words).length-1 ? "Learn next word." : "I'm done." }</Button>
                            </StyledDiv>
                        </span>
                    </span>
                    :
                // Practice
                props.type === "practice" ?
                    <span>
                        <StyledSpan>
                            {/* <MultipleChoice onNext={onNext} questionOptions={questionOptions} type={"infer"} choice={4}/> */}
                            <MultipleChoice answer={answer} onNext={onPracticeNext} incOffset={incOffset} choice={2} type={'practice'}/>
                            <WordCard word={word} />
                        </StyledSpan>
                    </span>
                :
                ''
                    
            }
        </StyledSegment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ActivityBar));