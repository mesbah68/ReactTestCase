import React from "react";
import { Socket } from "socket.io-client";

import ChatChannels from "./ChatChannels";
import VoiceChannels from "./VoiceChannels";

import { StyledChannelsWrapper, StyledHeaderWrapper } from "./style";

interface Props {
  socket: Socket;
  count: string;
  channels: any,
}

const Channels = ({ socket, count, channels }: Props) => {

  const voiceChannels = channels.filter((channel: { type: string; }) => channel.type === "voice");
  const chatChannels = channels.filter((channel: { type: string; }) => channel.type === "chat");

  return (
    <StyledChannelsWrapper>
      <StyledHeaderWrapper>
        <span>CHANNELS</span>
        <span>{count}</span>
      </StyledHeaderWrapper>
      <ChatChannels socket={socket} chatChannels={chatChannels} />
      <VoiceChannels socket={socket} voiceChannels={voiceChannels} />
    </StyledChannelsWrapper>
  );
};

export default Channels;
