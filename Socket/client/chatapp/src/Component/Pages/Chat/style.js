import Styled from 'styled-components';

export const StyledChatWrapper = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    background-color: #f1f4ff;
    border-radius: 30px;
    padding: 30px;
    height: 50rem;
    margin-top: 50px;
`;
export const StyledAvatarWrapper = Styled.div`
    display: flex;
    span {
        margin-left: 10px;
    }
`;

export const StyledMessageWrapper = Styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 20px;
    height: 39rem;
    background-color: #fafcff;
    overflow: auto;
    scrollbar-width: none; 
    ::-webkit-scrollbar {
    display: none;
  }
`;



