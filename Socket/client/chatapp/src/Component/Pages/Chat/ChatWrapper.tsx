// ignore eslint
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserSelectors, useUserActions } from "../../../@redux";

import { io, Socket } from "socket.io-client";

import { Col, Row, Typography } from "antd";

import EnterChatForm from "../../Common/EnterChatForm";
import ChatLists from "../../Common/ChatLists";
import NewMessageForm from "../../Common/NewMessageForm";
import Messages from "../../Common/Messages";

import {
  StyledChatWrapper,
  StyledChatInner,
  StyledMessageContent,
  StyledChatRoomHeader,
  StyledMessageWrapper,
} from "./style";

interface Props {
  chatRoomTitle: string;
}

const ChatWrapper = ({ chatRoomTitle }: Props) => {
  const [socket, setSocket] = useState<Socket>();
  const { Title } = Typography;

  const user = useSelector(UserSelectors.getUser);
  const { setUser } = useUserActions();

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    // setUser(null);
  }, []);

  console.log(user.id);

  return (
    <Row className="ant-row ant-row-center">
      <Col span={24}>
        <StyledChatWrapper>
          <StyledChatInner className="font-face-gb">
            {user && socket && socket.connected ? (
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
                    </StyledChatRoomHeader>
                    <StyledMessageContent>
                      <Messages socket={socket} />
                    </StyledMessageContent>
                  </StyledMessageWrapper>
                  <NewMessageForm socket={socket} />
                </Col>
              </Row>
            ) : null}
            {!!user.length && socket && !socket.connected ? (
              <div>
                <EnterChatForm socket={socket} />
              </div>
            ) : null}
          </StyledChatInner>
        </StyledChatWrapper>
      </Col>
    </Row>
  );
};

export default ChatWrapper;
