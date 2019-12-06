import React from 'react';
import styled from 'styled-components'
import './index.css';
import { Button, Dimmer, Loader, } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { storeWords, storeVideos, updateVideoIndex, updateWordIndex, storeDefinitions, updateMode, storeDummy } from '../actions';

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
})

class Home extends React.Component {
    componentDidMount() {
        const { storeWords, storeVideos, storeDefinitions, storeDummy,
                updateVideoIndex, updateWordIndex, storeUserId, updateMode } = this.props;
        updateVideoIndex(0);
        updateWordIndex(0);
        updateMode(false);
        fetch(`${process.env.REACT_APP_URL}/words`)
            .then(res => res.json())
            .then(res => {
                let videos = res['videos'];
                let words = res['words'];   
                let definitions = res['definitions'];
                let ID = res['user'];
                storeWords(words);
                storeVideos(videos);
                storeDefinitions(definitions);
                storeUserId(ID);
            })
            .catch(error => console.log('Error! ' + error.message))
        fetch(`${process.env.REACT_APP_URL}/dummy`)
            .then(res => res.json())
            .then(res => {
                let dummy = res['dummy']
                storeDummy(dummy);
            })
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
