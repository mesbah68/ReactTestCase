import Styled from "styled-components";

export const StyledChatWrapper = Styled.div`
  padding: 40px;
  background-color: #f1f4ff;
  border-radius: 10px;
`;
export const StyledChatInner = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  background-color: #fff;
  border-radius: 10px;
  height: 50rem;
  > div {
    height: 100%;
      > div {
        height: 100%
      }
    }
`;

export const StyledMessageWrapper = Styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  background-color: #f1f4ff;
`;
export const StyledMessageContent = Styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  background-color: #fafcff;
`;
export const StyledChatRoomHeader = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 15px 10px;
  margin-left: 1px;
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
    top: 65px;
    background-color: #eee;
    border-radius: 2px;
    z-index: 99;
    width: 130px;
    padding: 10px;
    span {
        cursor: pointer;
    }
`;
