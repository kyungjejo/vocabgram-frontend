import React from 'react';
import { Card } from 'semantic-ui-react'
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

const StyledCard = styled(Card)({
    margin: '1em auto !important'
})

const mapStateToProps = state => ({
    ...state
})

function WordCard(props) {
    const { words, wordIndex, definitions } = props;
    const word = words[wordIndex.index]
    const definition = definitions[wordIndex.index]
    return(
        <StyledCard>
            <Card.Content>
                <Card.Header>{word}</Card.Header>
            </Card.Content>
            <Card.Content>{definition}</Card.Content>
        </StyledCard>
    )
}

export default connect(mapStateToProps)(WordCard);