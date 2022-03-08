// ignore eslint
import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Context from "../../../Context";

import { Col,Row } from 'antd';

import EnterChatForm from "../../Common/EnterChatForm";
import Users from "../../Common/Users";
import NewMessageForm from "../../Common/NewMessageForm";
import Messages from "../../Common/Messages";

const ChatWrapper = () => {
    const { user, setUser } = useContext(Context);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:4000");
        setSocket(newSocket);
        setUser(null);
    }, []);
    
    return (
        <div>
            <h1>
                {user ? `chatting as ${user.name} ` : 'chat as ...'}
            </h1>
            {user && socket && socket.connected ? (
                <Row>
                    <Col span={12}>
                        <Users socket={socket} />
                    </Col>
                    <Col span={12}>
                        <span>
                            <Messages socket={socket} />
                        </span>
                        <NewMessageForm socket={socket} />
                    </Col>
                </Row>
                ) 
                : null 
            }
            {!user && socket ? (<div><EnterChatForm socket={socket} /></div>) : null }
        </div>
    )
};

export default ChatWrapper;
