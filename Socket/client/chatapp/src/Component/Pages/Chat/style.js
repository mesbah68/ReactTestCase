import Styled from "styled-components";

export const StyledChatWrapper = Styled.div``;

export const StyledChatRoomHeader = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 15px 10px;
  margin-left: 1px;
  margin-right: 1px;
  margin-bottom: 2px;
  border-radius: 0;
  h5 {
    margin: 0;
    padding-left: 15px;
    span {
        margin-right: 10px;
    }
  }
  svg {
    margin: 0 10px;
  }
`;

export const StyledProfileWrapper = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        cursor: pointer;
        margin: 0 15px;
    }
    span {
        &.username {
            margin-right: 10px;
        }
    }
`;

export const StyledShowMoreWrapper = Styled.div`
    position: absolute;
    right: 20px;
    top: 72px;
    background-color: #fff;
    border-radius: 3px;
    z-index: 99;
    width: 130px;
    padding: 10px;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
    span {
        cursor: pointer;
    }
`;
