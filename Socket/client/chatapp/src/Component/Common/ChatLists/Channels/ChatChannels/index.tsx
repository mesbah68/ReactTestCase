import React, { useEffect, useState } from "react";
// @ts-ignore
import { ArrowDown2TwoToneIcon, ArrowUp2TwoToneIcon } from "@iconbox/iconly";
// @ts-ignore
import { StarFillIcon } from "@iconbox/eva";

import Group from "../../../Group";

import { StyledChatChannelsWrapper, StyledHeaderWrapper } from "./style";

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
      {toggleIcon ? (
        <>
          <Group title="Share-Ukhtae" icon="😻" detail={<StarFillIcon />} />
          <Group title="General Chat" icon="💬" className="chat-icon" />
          <Group title="Introducing" icon="👋" />
          <Group title="Gibahin-Dribbble" icon="😂" />
          <Group title="Share-Shot" icon="👍" />
        </>
      ) : (
        ""
      )}
    </StyledChatChannelsWrapper>
  );
};

export default ChatChannels;
