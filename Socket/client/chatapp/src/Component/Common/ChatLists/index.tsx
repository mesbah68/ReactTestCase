import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography, Avatar, Input, Modal, Image } from "antd";
import { Socket } from "socket.io-client";
import { UserOutlined } from "@ant-design/icons";
// @ts-ignore
import { DeleteLightIcon, EditSquareLightIcon } from "@iconbox/iconly";
// @ts-ignore
import { MenuIcon } from "@iconbox/jamicons";
// @ts-ignore
import { SearchOutlineIcon } from "@iconbox/eva";

import  logo  from "./../../../assets/images/kLogo.png";
import kumpulo from "../../../assets/images/kumpulo.png";

import {
  useMessageActions,
  UserSelectors,
  useUserActions,
} from "../../../@redux";

import Channels from "./Channels";
import Group from "../Group";

import {
  StyledChatListWrapper,
  StyledAvatarWrapper,
  StyledSearchWrapper,
  StyledSystemWrapper,
  StyledIconWrapper,
} from "./style";
import HappyIcon from "../../../assets/images/happy.png";

interface Props {
  socket: Socket;
}

const ChatList = ({ socket }: Props) => {

  const user = useSelector(UserSelectors.getUser);
  const { setUser } = useUserActions();
  const { setMessages } = useMessageActions();

  const { Title, Text } = Typography;
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
    setUser([]);
    setMessages([]);
  };

  return (
    <StyledChatListWrapper>
      <Title level={4}>
        {user ? (
            <StyledIconWrapper>
              <StyledAvatarWrapper>
                <Avatar
                    src={logo}
                    size="large"
                />
                <img src={kumpulo} />
              </StyledAvatarWrapper>
              <MenuIcon size={2.5} />
            </StyledIconWrapper>
        ) : (
          "Chat"
        )}
      </Title>
      <>
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
      </>
    </StyledChatListWrapper>
  );
};

export default ChatList;
