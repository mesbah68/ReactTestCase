import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography, Avatar, Input } from "antd";
import { Socket } from "socket.io-client";
import { UserOutlined } from "@ant-design/icons";
// @ts-ignore
import { MenuIcon } from "@iconbox/jamicons";
// @ts-ignore
import { SearchOutlineIcon } from "@iconbox/eva";

import {
  useMessageActions,
  UserSelectors,
  useUserActions,
} from "../../../@redux";

import Context from "../../../Context";
import { UserItems } from "../../../Constant/GlobalType";
import Channels from "./Channels";
import Group from "../Group";

import {
  StyledChatListWrapper,
  StyledAvatarWrapper,
  StyledUserName,
  StyledSearchWrapper,
  StyledSystemWrapper,
} from "./style";

interface Props {
  socket: Socket;
}

const ChatList = ({ socket }: Props) => {
  // const [users, setUsers] = useState<UserItems[]>([]);
  // const { user, setUser, setMessages } = useContext(Context);

  const user = useSelector(UserSelectors.getUser);
  const { setUser } = useUserActions();
  const { setMessages } = useMessageActions();

  const { Title } = Typography;
  const CHANNELSCOUNT = "120";

  useEffect(() => {
    const listener = (user: any) => {
      setUser(user);
    };
    socket.on("users", listener);

    return () => {
      socket.off("users", listener);
    };
  }, [socket]);

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({});
    setMessages([]);
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
            {/* <StyledUserName>{user.name}</StyledUserName> */}
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
      <Channels socket={socket} count={CHANNELSCOUNT} />
      <StyledSystemWrapper>
        <Title level={5}>SYSTEM</Title>
        <Group title="General Setting" icon="⚙️" />
        <Group title="Logout" onClick={handleLogout} icon="🔴" />
      </StyledSystemWrapper>
    </StyledChatListWrapper>
  );
};

export default ChatList;
