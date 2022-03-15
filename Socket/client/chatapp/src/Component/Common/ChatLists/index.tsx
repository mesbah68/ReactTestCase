import React, { useContext, useEffect, useState } from "react";
import { Button, Typography, Avatar, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
// @ts-ignore
import { MenuIcon } from "@iconbox/jamicons";
// @ts-ignore
import { SearchOutlineIcon } from "@iconbox/eva";

import Context from "../../../Context";
import Channels from "./Channels";

import {
  StyledChatListWrapper,
  StyledAvatarWrapper,
  StyledUserName,
  StyledSearchWrapper,
} from "./style";

interface Props {
  socket: {
    on: Function;
  };
}

const ChatList = ({ socket }: Props) => {
  const [users, setUsers] = useState<
    Array<{
      id: string;
      name: string;
    }>
  >([]);
  const { user, setUser, setMessages, messages } = useContext(Context);

  const { Title } = Typography;
  const channelsCount = "120";

  useEffect(() => {
    socket.on("users", (users: any) => {
      setUsers(users);
    });
  }, [socket]);

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(null);
    setMessages(null);
  };

  return (
    <StyledChatListWrapper>
      <Title level={4}>
        {user ? (
          <StyledAvatarWrapper>
            <Avatar
              src="https://joeschmoe.io/api/v1/random"
              icon={<UserOutlined />}
              size="large"
            />
            <StyledUserName>{user.name}</StyledUserName>
            <MenuIcon size={2.5} />
          </StyledAvatarWrapper>
        ) : (
          "Chat"
        )}
      </Title>
      <StyledSearchWrapper>
        <Input placeholder="Search" />
        <SearchOutlineIcon size={3} onClick={() => {}} />
      </StyledSearchWrapper>
      <Channels socket={socket} count={channelsCount} />
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </StyledChatListWrapper>
  );
};

export default ChatList;
