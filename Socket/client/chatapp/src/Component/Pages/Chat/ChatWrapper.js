// ignore eslint
import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Context from "../../../Context";

import { Col, Row, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import EnterChatForm from "../../Common/EnterChatForm";
import Users from "../../Common/Users";
import NewMessageForm from "../../Common/NewMessageForm";
import Messages from "../../Common/Messages";

import { StyledChatWrapper, StyledAvatarWrapper, StyledMessageWrapper } from "./style";

const ChatWrapper = () => {
    const { user, setUser } = useContext(Context);
    const [socket, setSocket] = useState(null);
    const { Title } = Typography;

    useEffect(() => {
        const newSocket = io("http://localhost:4000");
        setSocket(newSocket);
        setUser(null);
    }, []);
    
    return (
        <Row className="ant-row ant-row-center">
            <Col span={12}>
                <StyledChatWrapper className="font-face-gb">
                    <Title level={2}>
                        {user ? 
                        <StyledAvatarWrapper>
                            <Avatar src="https://joeschmoe.io/api/v1/random" icon={<UserOutlined />} size="large" />
                            <span>{user.name}</span>
                        </StyledAvatarWrapper>  
                        : 'Chat'}
                    </Title>
                    {user && socket && socket.connected ? (
                        <Row>
                            <Col span={12}>
                                <Users socket={socket} />
                            </Col>
                            <Col span={12}>
                                <StyledMessageWrapper>
                                    <Messages socket={socket} />
                                </StyledMessageWrapper>
                                <NewMessageForm socket={socket} />
                            </Col>
                        </Row>
                        ) 
                        : null 
                    }
                    {!user && socket ? (<div><EnterChatForm socket={socket} /></div>) : null }
                </StyledChatWrapper>
            </Col>
        </Row>
    )
};

export default ChatWrapper;
