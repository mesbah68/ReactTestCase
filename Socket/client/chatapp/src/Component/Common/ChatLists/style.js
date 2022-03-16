import Styled from "styled-components";

export const StyledChatListWrapper = Styled.div`
  height: 100%;
  padding: 10px 20px;
  overflow: auto;
  scrollbar-width: none; 
  ::-webkit-scrollbar {
    display: none;
  }
  button {  
    border-radius: 15px;
    font-size: 16px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  h4 {
    margin: 0;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const StyledAvatarWrapper = Styled.div`
    display: flex;
    align-items: center;
`;

export const StyledUserName = Styled.span`
    flex-grow: 1;
    justify-content: flex-start !important;
    padding-left: 10px;
`;

export const StyledSearchWrapper = Styled.div`
    margin-top: 30px;
    position: relative;
    input {
      border-radius: 5px;
      height: 40px;
    }
    svg {
      position: absolute;
      right: 8px;
      top: 6px;
      cursor: pointer;
    }
`;

export const StyledSystemWrapper = Styled.div`
    border-top: 1px solid #f3f3f3;
    padding: 15px 0px;
    margin-top: 10px;
    h5 {
      font-size: 13px;
      color: #737373;
    }
`;
