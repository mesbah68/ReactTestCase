import Styled from 'styled-components';

export const StyledUserWrapper = Styled.div`
  height: 43rem;
  overflow: auto;
  scrollbar-width: none; 
  ::-webkit-scrollbar {
    display: none;
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


