import React, { useContext, useEffect, useState } from "react";
import { Button, Typography, Avatar, Input } from "antd";

// import Context from "../../../../Context";

// import User from "../../../../User";

import {
  StyledChannelsWrapper,
  StyledUserItem,
  StyledHeaderWrapper,
} from "./style";

interface Props {
  socket: {
    on: Function;
  };
  count: string;
}

const VoiceChannels = ({ socket, count }: Props) => {
  const [users, setUsers] = useState<
    Array<{
      id: string;
      name: string;
    }>
  >([]);

  useEffect(() => {
    socket.on("users", (users: any) => {
      setUsers(users);
    });
  }, [socket]);

  return (
    <StyledChannelsWrapper>
      <StyledHeaderWrapper>
        <span>CHANNELS</span>
        <span>{count}</span>
      </StyledHeaderWrapper>
      {/* {users.map((user: any, index: number) => (
        <StyledUserItem key={index}>
          <User user={user} />
        </StyledUserItem>
      ))} */}
    </StyledChannelsWrapper>
  );
};

export default VoiceChannels;
