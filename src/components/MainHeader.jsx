import React from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

const StyledHeader = styled(Header)`
    margin-top: 12px !important;
    text-align: center;
`

const StyledDiv = styled.div`
    font-weight: 400;
    font-size: 14px;
`

const mapStateToProps = state => ({
    ...state
})

function MainHeader(props) {
    let { userid } = props;
    let _userid;
    if (typeof userid === "object") _userid = Object.values(userid).join('')
    else _userid = userid
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
                <StyledDiv>{_userid ? _userid : ''}</StyledDiv>
            </Header.Content>
        </StyledHeader>
    )
}

export default connect(mapStateToProps)(withRouter(MainHeader));