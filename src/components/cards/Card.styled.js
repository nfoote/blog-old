import styled from 'styled-components';
export const StyledCard = styled.div`
    padding: 16px;
    border-radius: 25px;
    background: ${({ theme }) => theme === 'dark' ? '#050d11c7' : '#f1fafdd9'};

    :not(:last-child) {
        margin-top: 10vh;
        margin-bottom: 10vh;
    }
`;