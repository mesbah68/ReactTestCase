import React from "react";

import ChatChannels from "./ChatChannels";

import { StyledChannelsWrapper, StyledHeaderWrapper } from "./style";

interface Props {
  socket: {
    on: Function;
  };
  count: string;
}

const Channels = ({ socket, count }: Props) => {
  return (
    <StyledChannelsWrapper>
      <StyledHeaderWrapper>
        <span>CHANNELS</span>
        <span>{count}</span>
      </StyledHeaderWrapper>
      <ChatChannels socket={socket} />
    </StyledChannelsWrapper>
  );
};

export default Channels;
