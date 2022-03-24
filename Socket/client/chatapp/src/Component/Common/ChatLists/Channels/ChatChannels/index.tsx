import React, { useEffect, useState } from "react";
// @ts-ignore
import { ArrowDown2TwoToneIcon, ArrowUp2TwoToneIcon } from "@iconbox/iconly";
// @ts-ignore
import { StarFillIcon } from "@iconbox/eva";
import { Socket } from "socket.io-client";

import Group from "../../../Group";

import { StyledChatChannelsWrapper, StyledHeaderWrapper } from "./style";

interface Props {
  socket: Socket;
  count?: string;
}

type User = {
  id: string;
  name: string;
};

const ChatChannels = ({ socket, count }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [toggleIcon, setToggleIcon] = useState(true);

  useEffect(() => {
    const listener = (users: any) => {
      setUsers(users);
    };
    socket.on("users", listener);

    return () => {
      socket.off("users", listener);
    };
  }, [socket]);

  const handleChangeIcon = (e: React.FormEvent) => {
    e.preventDefault();
    setToggleIcon(!toggleIcon);
  };

  return (
    <StyledChatChannelsWrapper>
      <StyledHeaderWrapper>
        <span>CHAT CHANNELS</span>
        {toggleIcon ? (
          <ArrowUp2TwoToneIcon onClick={handleChangeIcon} />
        ) : (
          <ArrowDown2TwoToneIcon onClick={handleChangeIcon} />
        )}
      </StyledHeaderWrapper>
      {toggleIcon && (
        <>
          <Group title="Share-Ukhtae" icon="😻" detail={<StarFillIcon />} />
          <Group title="General Chat" icon="💬" className="chat-icon" />
          <Group title="Introducing" icon="👋" />
          <Group title="Gibahin-Dribbble" icon="😂" />
          <Group title="Share-Shot" icon="👍" />
        </>
      )}
    </StyledChatChannelsWrapper>
  );
};

export default ChatChannels;
