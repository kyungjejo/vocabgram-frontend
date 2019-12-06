import React from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

const StyledHeader = styled(Header)`
    margin-top: 12px !important;
    text-align: center;
`

const mapStateToProps = state => ({
    ...state
})

function MainHeader(props) {
    const { userid } = props;
    return(
        <StyledHeader as='h2' textAlign="center">
            <Header.Content>
                {
                    props.location.pathname === "/watch" ?
                    "Vocabulary Learning Task" 
                    :
                    props.location.pathname === '/infer' ?
                    "Word Meaning Inferencing Task"
                    :
                    props.location.pathname === '/practice' ?
                    "Gap-filling Task"
                    :
                    "Welcome"
                }
                {/* <span>{userid ? userid : ''}</span> */}
            </Header.Content>
        </StyledHeader>
    )
}

export default connect(mapStateToProps)(withRouter(MainHeader));