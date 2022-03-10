import React, { useContext, useEffect } from "react";

import Message from "../Message";
import Context from "../../../Context";

import { StyledMessagesWrapper, StyledMessageItem } from "./style";

const Messages = ({ socket }) => {
    const { messages, setMessages } = useContext(Context);

    useEffect(() => {
        socket.on('msg', message => {
            setMessages(message);
        });
    }, [socket])

    return (
        <StyledMessagesWrapper>
            {messages && messages.map((message, index) => (
                <StyledMessageItem>
                    <Message key={index} msg={message} />
                </StyledMessageItem>
            ))}
        </StyledMessagesWrapper>
    )

};

export default Messages;
