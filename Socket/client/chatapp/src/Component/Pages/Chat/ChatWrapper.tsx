// ignore eslint
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserSelectors, useUserActions } from "../../../@redux";

import { io, Socket } from "socket.io-client";

import { Col, Row, Typography } from "antd";

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
} from "./style";

interface Props {
  chatRoomTitle: string;
}

const ChatWrapper = ({ chatRoomTitle }: Props) => {
  const [socket, setSocket] = useState<Socket>();
  const { Title } = Typography;

  const user = useSelector(UserSelectors.getUser);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
  }, []);

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
