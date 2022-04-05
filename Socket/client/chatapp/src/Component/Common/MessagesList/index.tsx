import React, { useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import {Avatar, Col, Row, Typography} from "antd";
// @ts-ignore
import { MenuIcon } from "@iconbox/jamicons";
// @ts-ignore
import { ArrowDown2TwoToneIcon, NotificationLightIcon } from "@iconbox/iconly";
// @ts-ignore
import { MoreVerticalFillIcon } from '@iconbox/eva';

import { useQuery } from '@apollo/client';

import {UserSelectors, useMessageActions, useUserActions, ChatSelectors, useSidebarActions} from "../../../@redux";

import Group from "../Group";
import Messages from "../../Common/Messages";

import { getMessagesQuery } from '../../queries';

import {
  StyledMessageContent,
  StyledChatRoomHeader,
  StyledMessageWrapper,
  StyledProfileWrapper,
  StyledShowMoreWrapper,
  StyledUserWrapper,
} from "./style";

interface Props {
  socket: Socket;
  setSideBarVisibility: Function,
  sideBarVisibility: Boolean,
}

const MessagesList = ({ socket, setSideBarVisibility, sideBarVisibility }: Props) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const { clearAllMessages, setMessages } = useMessageActions();
  const { setSidebarTitle } = useSidebarActions();
  const { loading, data } = useQuery(getMessagesQuery);

  const { setUser } = useUserActions();
  const { Title, Text } = Typography;

  const user = useSelector(UserSelectors.getUser);
  const activeChat = useSelector(ChatSelectors.getActiveChat);

  const handleShowMore = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMore(!showMore);
  }

  const handleDeleteChat = (e: any) => {
    e.preventDefault();
    clearAllMessages(activeChat.name);
    // @ts-ignore
    socket.emit("deleteChat", activeChat.name);
    setShowMore(false);
  }

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    setUser([]);
    setMessages([]);
  };

  const handleSetSidebarTitle = (title: string) => {
    setSidebarTitle(title);
    setShowMore(false);
  }

  return (
      <StyledMessageWrapper visibility={sideBarVisibility}>
          <StyledChatRoomHeader>
            <MenuIcon size={2.5} onClick={() => setSideBarVisibility(!sideBarVisibility)} />
            <Title level={5}>
              <span>💬 </span>
              {activeChat.name}
            </Title>
            <StyledProfileWrapper>
              <NotificationLightIcon />
              <StyledUserWrapper onClick={handleShowMore}>
                <Text className="username">{user[0]?.name}</Text>
                <Avatar
                    src="https://joeschmoe.io/api/v1/random"
                    size="large"
                >{user[0]?.name[0].toUpperCase()}</Avatar>
                <ArrowDown2TwoToneIcon />
              </StyledUserWrapper>
              {showMore &&
              <StyledShowMoreWrapper>
                <Group title="Profile" onClick={() => handleSetSidebarTitle("Profile")} />
                <Group title="Contacts" onClick={() => handleSetSidebarTitle("Contacts")} />
                <Group title="Setting" onClick={() => handleSetSidebarTitle("Setting")} />
                <Group title="Logout" onClick={handleLogout} />
              </StyledShowMoreWrapper>
              }
            </StyledProfileWrapper>
          </StyledChatRoomHeader>
          <StyledMessageContent>
            <Messages socket={socket} data={data} />
          </StyledMessageContent>
        </StyledMessageWrapper>
  );
};

export default MessagesList;
