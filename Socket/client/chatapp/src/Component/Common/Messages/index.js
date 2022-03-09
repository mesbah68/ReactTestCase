import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';

import Message from "../Message";

import { StyledMessagesWrapper, StyledMessageItem } from "./style";

const Messages = ({socket}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('msg', messages => {
            setMessages(messages);
        });
    }, [socket])
console.log(messages);
    return (
        <StyledMessagesWrapper>
            {messages.map((message,index) => (
                <StyledMessageItem>
                    <Message key={index} msg={message} />
                </StyledMessageItem>
            ))}
        </StyledMessagesWrapper>
    )
};

export default Messages;
