import Styled from "styled-components";

export const StyledProfileWrapper = Styled.div`
  padding: 10px 20px 50px;
  background-color: #fff;
  position: relative;
  overflow: auto;
  height: 100vh;
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
  flex-direction: column;
  align-items: center;
  .ant-badge-dot {
   background : #29ae60;
   top: 30px;
  }
`;
export const StyledUsername = Styled.span`
  flex-grow: 1;
  cursor: pointer;
  padding-top: 20px;
  font-size: 18px;
`;
