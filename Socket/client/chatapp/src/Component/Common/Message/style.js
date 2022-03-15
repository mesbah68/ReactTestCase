import Styled from "styled-components";

export const StyledMessageItem = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  margin-bottom: 40px;
  &.currentUser {
    flex-direction: row-reverse;
    float: right;
  }
`;
export const StyledMessageText = Styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: end;
  max-width: 75%;
  margin-left: 10px;
  div {
    &.bg-blue {
      margin-right: 10px;
    }
  }
  span {
    position: absolute;
    bottom: -20px;
    left: 0;
    min-width: 50px;
    color: #ccc;
    &.currentUser {
      right: 0;
      left: auto;
    }
  }
  > div {
    margin-bottom: 10px;
    height: auto;
    display: inline-block;
    padding: 10px;
    display: inline-block;
    &:last-child {
      width: 65%;
    }
  }
`;
export const StyledIconsWrapper = Styled.div`
  svg {
    margin-right: 10px;
    g, path {
      stroke: gray !important;
    }
  }
`;
