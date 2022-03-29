// ignore eslint
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserSelectors, useMessageActions } from "../../../@redux";

import { io, Socket } from "socket.io-client";

import {Avatar, Col, Row, Typography} from "antd";
// @ts-ignore
import { ArrowDown2TwoToneIcon } from "@iconbox/iconly";
// @ts-ignore
import { NotificationLightIcon } from '@iconbox/iconly';


import EnterChatForm from "../../Common/EnterChatForm";
import ChatLists from "../../Common/ChatLists";
import ContactsList from "../../Common/ContactsList";
import Messages from "../../Common/Messages";

import {
  StyledChatWrapper,
  StyledChatInner,
  StyledMessageContent,
  StyledChatRoomHeader,
  StyledMessageWrapper,
  StyledProfileWrapper,
  StyledShowMoreWrapper,
  StyledUserWrapper,
} from "./style";

interface Props {
  chatRoomTitle: string;
}

const ChatWrapper = ({ chatRoomTitle }: Props) => {
  const [socket, setSocket] = useState<Socket>();
  const [showMore, setShowMore] = useState<boolean>(false);
  const { clearAllMessages } = useMessageActions();
  const { Title, Text } = Typography;

  const user = useSelector(UserSelectors.getUser);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
  }, []);

  const handleShowMore = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMore(!showMore);
  }

  const handleDeleteChat = (e: any) => {
    e.preventDefault();
    clearAllMessages();
    // @ts-ignore
    socket.emit("deleteChat");
    setShowMore(false);
  }

  return (
    <Row className="ant-row ant-row-center">
      <Col span={24}>
        <StyledChatWrapper>
          <StyledChatInner className="font-face-gb">
            {user.length!==0 && socket ? (
              <Row>
                <Col span={8}>
                  <ChatLists socket={socket} />
                </Col>
                <Col span={16}>
                  <StyledMessageWrapper>
                    <StyledChatRoomHeader>
                      <Title level={5}>
                        <span>💬 </span>
                        {chatRoomTitle}
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
                          <Text onClick={handleDeleteChat}>Delete Chat</Text>
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
                </Col>
              </Row>
            ) : (
              socket &&
              user?.length === 0 && (
                <div>
                  <EnterChatForm socket={socket} />
                </div>
              )
            )}
          </StyledChatInner>
        </StyledChatWrapper>
      </Col>
    </Row>
  );
};

export default ChatWrapper;
