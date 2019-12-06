import React, { useState } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import styled from 'styled-components'
import WordCard from '../components/WordCard';
import MultipleChoice from '../components/MultipleChoice';

import { connect } from 'react-redux';
import { updateVideoIndex, updateWordIndex, updateMode } from '../actions';

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
    updateWordIndex: (index) => dispatch(updateWordIndex(index)),
    updateMode: (mode) => dispatch(updateMode(mode)),
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

    const { word, updateVideoIndex, updateWordIndex, updateMode,
        videoIndex, incOffset, wordIndex, words, dummy, definitions } = props;
    // updateMode(false);
    const incVideoIndex = () => {
        updateVideoIndex(videoIndex.index+1)
    }

    const onProceed = () => {
        const next = wordIndex.index < Object.keys(words).length - 1;
        if (next) {
            updateWordIndex(wordIndex.index+1);
            updateVideoIndex(0);
        }
    }

    const toQuestionMode = () => {
        let defs = [['correct', definitions[wordIndex.index]]]
        for (let i = 1; i < 4; i++) {
            defs.push(['incorrect'+i.toString(), Object.values(dummy).splice(Math.floor(Math.random() * Object.values(dummy).length), 1)[0]]);
        }
        defs = shuffleArray(defs);
        setQuestionOptions(defs);
        updateMode(true);

    }

    return (
        <StyledSegment textAlign="center">
            {
                // Infer & no option to proceed
                props.type === "infer" && props.mode ?
                    <span>
                        <StyledSpan>
                            <StyledP><u>Target Word: {word}</u></StyledP>
                            <StyledP>Focus on learning both <b>the meaning and the use</b> of the word.</StyledP>
                        </StyledSpan>
                        <span>
                            <StyledP>Please watch <b>at least three</b> videos before proceeding to the next stage.</StyledP>
                            <Button onClick={incOffset} color="yellow">Video is too short.</Button>
                            <Button primary onClick={incVideoIndex}>Watch Next Video</Button>
                        </span>
                    </span>
                    :
                // Infer & user may proceed
                props.type === "infer" && !props.mode ?
                    <span>
                        {
                            props.questionMode ?
                            <MultipleChoice questionOptions={questionOptions} type={"infer"} choice={4}/>
                            :
                            <span>
                                <StyledSpan>
                                    <StyledP><u>Target Word: {word}</u></StyledP>
                                    <StyledP>Focus on learning both <b>the meaning and the use</b> of the word.</StyledP>
                                </StyledSpan>
                                <StyledSpan>
                                    <StyledP>If you feel you're ready, you may test yourself.</StyledP>
                                    <StyledP>Or click "I'm not ready yet" to watch more videos before taking the test.</StyledP>
                                </StyledSpan>
                                <StyledDiv>
                                    <Button onClick={incOffset} color="yellow">Video is too short.</Button>
                                    <Button negative onClick={incVideoIndex}>I'm not ready yet.</Button>
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
                            <Button primary onClick={ incVideoIndex }>Watch Next Video</Button>
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
                                <Button negative onClick={ incVideoIndex }>I'm not ready yet.</Button>
                                <Button positive onClick={ onProceed }>{ wordIndex.index < Object.keys(words).length-1 ? "Learn next word." : "I'm done." }</Button>
                            </StyledDiv>
                        </span>
                    </span>
                    :
                // Practice
                props.type === "practice" && props.mode ?
                    <span>
                        <StyledSpan>
                            <MultipleChoice choice={2} type={'practice'}/>
                        </StyledSpan>
                        <Button onClick={incOffset} color="yellow">Video is too short.</Button>
                        <Button positive>Proceed</Button>
                    </span>
                :
                ''
                    
            }
        </StyledSegment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityBar);