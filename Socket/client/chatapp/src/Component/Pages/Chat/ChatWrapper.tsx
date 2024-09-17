// ignore eslint
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import {Col, Drawer, Row} from "antd";

import { UserSelectors, SidebarSelectors } from "../../../@redux";

// @ts-ignore
import { ArrowDown2TwoToneIcon, NotificationLightIcon } from "@iconbox/iconly";


import EnterChatForm from "../../Common/EnterChatForm";
import ChatsList from "../../Common/ChatsList";
import MessagesList from "../../Common/MessagesList";
import RightSidebar from "../../Common/RightSidebar";

import {
  StyledChatWrapper,
} from "./style";

const ChatWrapper = () => {
  const [socket, setSocket] = useState<Socket>();
  const [chatListVisible, setChatListVisible] = useState(true);

  const user = useSelector(UserSelectors.getUser);
  const sidebarTitle = useSelector(SidebarSelectors.getSidebarTitle);

  useEffect(() => {
    const newSocket = io("http://localhost:4002");
    setSocket(newSocket);
  }, []);

  return (
      <StyledChatWrapper className="font-face-gb">
        {user.length!==0 && socket ? (
            <Row>
              <Col span={chatListVisible ? 6 : 0}>
                <Drawer
                    placement="left"
                    width="25%"
                    mask={false}
                    visible={chatListVisible}
                    closable={false}
                    className="sidebar"
                    contentWrapperStyle={{boxShadow: "none"}}
                >
                  <ChatsList socket={socket} setVisibility={setChatListVisible} />
                </Drawer>
              </Col>
              <Col span={chatListVisible ? 12 : 18}>
                <MessagesList setSideBarVisibility={setChatListVisible} sideBarVisibility={chatListVisible} socket={socket} />
              </Col>
              <Col span={!!sidebarTitle ? 6 : 0}>
                <RightSidebar socket={socket} sidebarTitle={sidebarTitle} />
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
      </StyledChatWrapper>
  );
};

export default ChatWrapper;
