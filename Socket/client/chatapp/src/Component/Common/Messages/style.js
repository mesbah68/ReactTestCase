import Styled from "styled-components";

export const StyledMessagesWrapper = Styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledMessageItem = Styled.div``;
export const StyledMessageContent = Styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-bottom: 60px;
  height: 40rem;
  overflow: auto;
  scrollbar-width: none; 
  ::-webkit-scrollbar {
    display: none;
  }`;
