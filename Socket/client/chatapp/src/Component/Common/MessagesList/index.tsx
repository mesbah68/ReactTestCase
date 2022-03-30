import React, { useState } from "react";
import { useSelector } from "react-redux";
import {useLocation} from "react-router-dom";
import { io, Socket } from "socket.io-client";
import {Avatar, Col, Row, Typography} from "antd";
// @ts-ignore
import { MenuIcon } from "@iconbox/jamicons";
// @ts-ignore
import { ArrowDown2TwoToneIcon, NotificationLightIcon } from "@iconbox/iconly";
// @ts-ignore
import { MoreVerticalFillIcon } from '@iconbox/eva';

import { UserSelectors, useMessageActions, useUserActions } from "../../../@redux";

import Group from "../Group";
import Messages from "../../Common/Messages";
import ContactsList from "../../Common/ContactsList";

import {
  StyledMessageContent,
  StyledChatRoomHeader,
  StyledMessageWrapper,
  StyledProfileWrapper,
  StyledShowMoreWrapper,
  StyledUserWrapper,
} from "./style";

interface Props {
  chatRoomTitle: string;
  socket: Socket;
  setSideBarVisibility: Function,
  sideBarVisibility: Boolean,
}

const MessagesList = ({ chatRoomTitle, socket, setSideBarVisibility, sideBarVisibility }: Props) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const { clearAllMessages, setMessages } = useMessageActions();
  const { setUser } = useUserActions();
  const { Title, Text } = Typography;

  const location = useLocation();
  const pathname = location.pathname.split('/')[1];

  const user = useSelector(UserSelectors.getUser);

  const handleShowMore = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMore(!showMore);
  }

  const handleDeleteChat = (e: any) => {
    e.preventDefault();
    clearAllMessages(pathname);
    // @ts-ignore
    socket.emit("deleteChat");
    setShowMore(false);
  }

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    setUser([]);
    setMessages([]);
  };

  return (
      <StyledMessageWrapper>
          <StyledChatRoomHeader>
            <MenuIcon size={2.5} onClick={() => setSideBarVisibility(!sideBarVisibility)} />
            <Title level={5}>
              <span>💬 </span>
              {pathname}
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
                <Group title="Delete Chat" onClick={handleDeleteChat} />
                <Group title="General Setting" />
                <Group title="Logout" onClick={handleLogout} />
              </StyledShowMoreWrapper>
              }
            </StyledProfileWrapper>
          </StyledChatRoomHeader>
          <StyledMessageContent>
            <Row>
              <Col span={16}>
                <Messages socket={socket} />
              </Col>
              <Col span={8}>
                <ContactsList socket={socket} />
              </Col>
            </Row>
          </StyledMessageContent>
        </StyledMessageWrapper>
  );
};

export default MessagesList;
