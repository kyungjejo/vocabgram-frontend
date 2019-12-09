import React,{ useState } from 'react';
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { updateMode, updateVideoIndex, updateWordIndex } from '../actions';

const practiceOptions = [{value: 0, name: 'Video A'}, {value: 1, name: 'Video B'}];

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
    const { questionOptions, videos, videoIndex, wordIndex, words, userid, pseudo, incOffset, onNext, answer } = props;

    function onSubmitHandler(type) {
        setResult(selectedOptions.selectedOptions[0]);
        let _userid;
        if (typeof userid === "object") _userid = Object.values(userid).join('')
        else _userid = userid
        if (type==='infer') {
            let param = `user=${_userid}&word=${words[wordIndex.index]}&result=${selectedOptions.selectedOptions[0]==='correct' ? '1' : '0'}`
            fetch(`${process.env.REACT_APP_URL}/infer?`+param)
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(error => console.log('Error! ' + error.message))   
        }
        else if (type==='practice') {
            let param = `user=${_userid}&word=${words[wordIndex.index]}&videoId=${videos[wordIndex.index][videoIndex.index][0]}&videoIndex=${videoIndex.index}&result=${selectedOptions.selectedOptions[0]==='correct' ? '1' : '0'}`
            fetch(`${process.env.REACT_APP_URL}/practice?`+param)
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(error => console.log('Error! ' + error.message))   
        }
    }

    const nextPracticeHandler = (result, type) => {
        onNext(result, type);
        setResult(false);
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
                                <Button primary onClick={() => onNext(result, 'infer')}>
                                    { result === 'correct' ? "Next" : "Watch more video"}
                                </Button>
                            </div>
                            :
                            <div>
                                <Test onOptionSelect={selectedOptions => setSelectedOptions({selectedOptions})}
                                    style={{margin: 'auto', maxWidth: '840px', display: 'block', minWidth: '80%'}}>
                                    <QuestionGroup questionNumber={0}>
                                    <Question style={{fontSize: '16px', fontWeight: '400', padding: '8px 0'}}>Which of the following definitions best describe the word, <span style={{fontWeight: 800}}>"{pseudo[wordIndex.index]}"</span>?</Question>
                                    {
                                        questionOptions.map((val, idx) => {
                                            return <Option disabled={result} key={idx} style={{fontSize: '14px'}} value={val[0]}>{val[1]}</Option>
                                        })
                                    }
                                    </QuestionGroup>
                                </Test>   
                                <Button positive onClick={() => onSubmitHandler('infer')}>Submit</Button>
                            </div>
                        }
                    </div>
                    :
                    ''
                :
                <div>
                    {
                        result ?
                        <div style={{padding: '2px', background: result ? result === 'correct' ? 'rgba(20,255,20,0.4)' : 'rgba(255,20,20,0.6)' : ''}}>
                            <div>{result ? result === 'correct' ? "You are correct!." : "Whoops! Wrong answer." : ''}
                            </div>
                            <Button primary onClick={() => nextPracticeHandler(result,'practice')}>
                                Next
                            </Button>
                        </div>
                        :
                        <div>
                            <Test onOptionSelect={selectedOptions => setSelectedOptions({selectedOptions})}
                                style={{margin: 'auto', maxWidth: '640px', display: 'block', minWidth: '60%'}}>
                                <QuestionGroup questionNumber={0}>
                                <Question style={{fontSize: '16px', fontWeight: '800', padding: '8px 0'}}>In which video do you think the word, "{pseudo[wordIndex.index]}", is more appropriate to  ?</Question>
                                {
                                    practiceOptions.map((val, idx) => {
                                        return <Option key={idx} style={{fontSize: '14px'}} value={answer===idx ? 'correct' : 'incorrect'}>{val.name}</Option>
                                    })
                                }
                                </QuestionGroup>
                            </Test>
                            <Button onClick={incOffset} color="yellow">Video is too short.</Button>
                            <Button positive onClick={() => onSubmitHandler('practice')}>Proceed</Button>
                        </div>
                    }
                </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);