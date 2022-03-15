import React, { useContext, useEffect, useState } from "react";
import { Button, Typography, Avatar, Input } from "antd";
// @ts-ignore
import { ArrowDown2TwoToneIcon, ArrowUp2TwoToneIcon } from "@iconbox/iconly";

import Context from "../../../../../Context";

import User from "../../../User";

import {
  StyledChatChannelsWrapper,
  StyledUserItem,
  StyledHeaderWrapper,
} from "./style";

interface Props {
  socket: {
    on: Function;
  };
  count?: string;
}

const ChatChannels = ({ socket, count }: Props) => {
  const [users, setUsers] = useState<
    Array<{
      id: string;
      name: string;
    }>
  >([]);
  const [toggleIcon, setToggleIcon] = useState(true);

  useEffect(() => {
    socket.on("users", (users: any) => {
      setUsers(users);
    });
  }, [socket]);

  const handleIconChange = (e: React.FormEvent) => {
    e.preventDefault();
    setToggleIcon(!toggleIcon);
    console.log(toggleIcon);
  };
  console.log(toggleIcon);

  return (
    <StyledChatChannelsWrapper>
      <StyledHeaderWrapper>
        <span>CHAT CHANNELS</span>
        {toggleIcon ? (
          <ArrowUp2TwoToneIcon onClick={handleIconChange} />
        ) : (
          <ArrowDown2TwoToneIcon onClick={handleIconChange} />
        )}
      </StyledHeaderWrapper>
      {toggleIcon
        ? users.map((user: any, index: number) => (
            <StyledUserItem key={index}>
              <User user={user} />
            </StyledUserItem>
          ))
        : ""}
    </StyledChatChannelsWrapper>
  );
};

export default ChatChannels;
