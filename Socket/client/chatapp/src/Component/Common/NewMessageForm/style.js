import Styled from 'styled-components';

export const StyledMessageWrapper = Styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 20px;
    form {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        input {
            border-radius: 8px;
            height: 50px;
            width: 100%;
        }
        button {
            border: none;
            background-color: transparent;
            &:hover {
                background-color: transparent;
            }
        }
        svg {
            margin-left: 10px;
        }
    }
`;


