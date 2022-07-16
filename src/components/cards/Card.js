import React from 'react';
import { StyledCard } from './Card.styled';

const Card = ({ content, children }) => {
    const { heading, paragraph1, paragraph2 } = content || {};
    return (
        <StyledCard>
            {heading && <h1>{heading}</h1>}
            {paragraph1 && <p>{paragraph1}</p>}
            {paragraph2 && <p>{paragraph2}</p>}
            {children && children}
        </StyledCard>
    );
};

export default Card;