import styled from 'styled-components';
export const StyledCard = styled.div`
    padding: 16px;
    border-radius: 25px;
    background: var(--bg);

    :not(:last-child) {
        margin-top: 10vh;
        margin-bottom: 10vh;
    }
`;