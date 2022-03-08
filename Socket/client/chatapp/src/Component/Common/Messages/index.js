import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';

import Message from "../Message";

const Messages = ({socket}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('msg', messages => {
            setMessages(messages);
        });
    }, [socket])

    return (
        <ul>
            {messages.map((message,index) => (
                <li>
                    <Message key={index} msg={message} />
                </li>
            ))}
        </ul>
    )
};

export default Messages;
