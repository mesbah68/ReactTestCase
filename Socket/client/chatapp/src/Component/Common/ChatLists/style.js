import Styled from "styled-components";

export const StyledUserWrapper = Styled.div`
  height: 100%;
  padding: 10px;
  overflow: auto;
  scrollbar-width: none; 
  ::-webkit-scrollbar {
    display: none;
  }
  button {
    margin-left: 10px;
    border-radius: 15px;
    font-size: 16px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export const StyledUserItem = Styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 60px;
  border-radius: 15px;
  padding-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}
`;
