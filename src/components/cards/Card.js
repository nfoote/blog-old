import React from 'react';
import { StyledCard } from './Card.styled';

const Card = ({ content, children, theme }) => {
    const { heading, paragraph1, paragraph2 } = content || {};

    return (
        <StyledCard theme={theme}>
            {heading && <h1>{heading}</h1>}
            {paragraph1 && <p>{paragraph1}</p>}
            {paragraph2 && <p>{paragraph2}</p>}
            {children && children}
        </StyledCard>
    );
};

export default Card;