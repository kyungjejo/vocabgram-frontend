import React,{ useState } from 'react';
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { updateMode, updateVideoIndex, updateWordIndex } from '../actions';

const inferOptions = [{value: 0, name: 'definition 1'}, {value: 1, name: 'definition 2'}, {value: 2, name: 'definition 3'}, {value: 3, name: 'definition 4'}]
const practiceOptions = [{value: 0, name: 'Video A'}, {value: 1, name: 'Video B'}]

{/* <div>{selectedOptions && selectedOptions['selectedOptions'] ? 
                "Your selected the answer #" + (parseInt(selectedOptions['selectedOptions']['0'])+1) : 'Please select one of the below'}.</div> */}

const mapStateToProps = state => ({
        ...state
    })


const mapDispatchToProps = dispatch => ({
    updateVideoIndex: (index) => dispatch(updateVideoIndex(index)),
    updateWordIndex: (index) => dispatch(updateWordIndex(index)),
    updateMode: (mode) => dispatch(updateMode(mode)),
})

function MultipleChoice(props) {
    const [selectedOptions, setSelectedOptions]= useState({});
    const [result, setResult]= useState();
    const { questionOptions, wordIndex, words, videoIndex,
        updateVideoIndex, updateWordIndex, updateMode } = props;

    function onSubmitHandler() {
        setResult(selectedOptions.selectedOptions[0]);
    }

    function onNext() {
        if (result === 'correct') {
            const next = wordIndex.index < Object.keys(words).length - 1;
            if (next) {
                updateWordIndex(wordIndex.index+1);
                updateVideoIndex(0);
                updateMode(false);
            }
        }
        else {
            updateMode(false);
            updateVideoIndex(videoIndex.index+1);
        }
    }

    return (
            props.type === 'infer' ?
                Object.keys(questionOptions).length>0 ?
                    <div>
                        {
                            result ?
                            <div style={{padding: '2px', background: result ? result === 'correct' ? 'rgba(20,255,20,0.4)' : 'rgba(255,20,20,0.6)' : ''}}>
                                <div>{result ? result === 'correct' ? "You are correct!." : "Whoops! Wrong answer. Please watch more videos and try again." : ''}
                                </div>
                                <Button primary onClick={onNext}>
                                    { result === 'correct' ? "Next" : "Watch more video"}
                                </Button>
                            </div>
                            :
                            <div>
                                <Test onOptionSelect={selectedOptions => setSelectedOptions({selectedOptions})}
                                    style={{margin: 'auto', maxWidth: '840px', display: 'block', minWidth: '80%'}}>
                                    <QuestionGroup questionNumber={0}>
                                    <Question style={{fontSize: '16px', fontWeight: '400', padding: '8px 0'}}>Which of the following definitions best describe the word, <span style={{fontWeight: 800}}>"{words[wordIndex.index]}"</span>?</Question>
                                    {
                                        questionOptions.map((val, idx) => {
                                            return <Option disabled={result} key={idx} style={{fontSize: '14px'}} value={val[0]}>{val[1]}</Option>
                                        })
                                    }
                                    </QuestionGroup>
                                </Test>   
                                <Button positive onClick={onSubmitHandler}>Submit</Button>
                            </div>
                        }
                    </div>
                    :
                    ''
                :
                <Test onOptionSelect={selectedOptions => setSelectedOptions({selectedOptions})}
                    style={{margin: 'auto', maxWidth: '640px', display: 'block', minWidth: '60%'}}>
                    <QuestionGroup questionNumber={0}>
                    <Question style={{fontSize: '16px', fontWeight: '800', padding: '8px 0'}}>In which video do you think the word, "{words[wordIndex.index]}", is more appropriate to  ?</Question>
                    {
                        practiceOptions.map((val, idx) => {
                            return <Option key={idx} style={{fontSize: '14px'}} value={val.value.toString()}>{val.name}</Option>
                        })
                    }
                    </QuestionGroup>
                </Test>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);