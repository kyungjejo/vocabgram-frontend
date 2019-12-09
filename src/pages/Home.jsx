import React from 'react';
import styled from 'styled-components'
import './index.css';
import { Button, Dimmer, Loader, } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { storeWords, storeVideos, updateVideoIndex, storeDummyVideos, storeDummyWords,
    storeUserID, storePracticeIndex, updateWordIndex, storeDefinitions, 
    updateMode, storeDummy, storePseudowords } from '../actions';

const Container = styled.div`
    min-width: 60%;
    max-width: 80%;
    margin: 16px auto;
    text-align: center !important;
`

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    storeVideos: (videos) => dispatch(storeVideos(videos)),
    storeWords: (words) => dispatch(storeWords(words)),
    storeDefinitions: (definitions) => dispatch(storeDefinitions(definitions)),
    updateVideoIndex: (index) => dispatch(updateVideoIndex(index)),
    updateWordIndex: (index) => dispatch(updateWordIndex(index)),
    updateMode: (mode) => dispatch(updateMode(mode)),
    storeDummy: (dummy) => dispatch(storeDummy(dummy)),
    storeUserID: (id) => dispatch(storeUserID(id)),
    storePracticeIndex: (arr) => dispatch(storePracticeIndex(arr)),
    storePseudowords: (pseudo) => dispatch(storePseudowords(pseudo)),
    storeDummyVideos: (videos) => dispatch(storeDummyVideos(videos)),
    storeDummyWords: (words) => dispatch(storeDummyWords(words)),
})

class Home extends React.Component {
    componentDidMount() {
        const { storeWords, storeVideos, storeDefinitions, storeDummy, userid, storePracticeIndex, storePseudowords,
                updateVideoIndex, updateWordIndex, storeUserID, updateMode, storeDummyVideos, storeDummyWords } = this.props;
        updateVideoIndex(0);
        updateWordIndex(0);
        updateMode(false);
        if (Object.keys(userid).length === 0 ) {
            fetch(`${process.env.REACT_APP_URL}/words`)
                .then(res => res.json())
                .then(res => {
                    let videos = res['videos'];
                    let words = res['words'];   
                    let definitions = res['definitions'];
                    let ID = res['user'];
                    let pseudo = res['pseudowords'];
                    let dummyWords = res['dummy_words'];
                    let dummyVideos = res['dummy_videos'];
                    storeWords(words);
                    storeVideos(videos);
                    storeDefinitions(definitions);
                    storeUserID(ID);
                    storePseudowords(pseudo);
                    storePracticeIndex(new Array(words.length).fill(0));
                    storeDummyVideos(dummyVideos);
                    storeDummyWords(dummyWords);
                })
                .catch(error => console.log('Error! ' + error.message))
            fetch(`${process.env.REACT_APP_URL}/dummy`)
                .then(res => res.json())
                .then(res => {
                    let dummy = res['dummy']
                    storeDummy(dummy);
                })
        }

    }
    render() {
        const { definitions } = this.props;
        return(
            <Container>
                <h1>Welcome!</h1>
                <p>Placeholder for instruction</p>
                {
                    Object.keys(definitions).length > 0 ?
                    <div>
                        <Link to="/watch"><Button primary>Type A</Button></Link>
                        <Link to="/infer"><Button primary>Type B</Button></Link>
                        <Link to="/internal"><Button primary>Internal</Button></Link>
                    </div>
                    :
                    <Dimmer active>
                        <Loader size='large' indeterminate>Loading</Loader>
                    </Dimmer>
                }
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
