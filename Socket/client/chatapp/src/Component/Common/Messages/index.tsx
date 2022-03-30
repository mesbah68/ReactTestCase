import React, { useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

import Message from "../Message";
import NewMessageForm from "../NewMessageForm";

import { StyledMessagesWrapper, StyledMessageItem, StyledMessageContent } from "./style";
import {
  MessageSelectors,
  useMessageActions,
} from "../../../@redux";

interface Props {
  socket: Socket;
}

const Messages = ({ socket }: Props) => {
  const messages = useSelector(MessageSelectors.getMessagesList);
  const { setMessages } = useMessageActions();
  const messageRef = useRef(null);
  const location = useLocation();
  const pathname = location.pathname.split('/')[1];

  useEffect(() => {
    const listener = (message: any) => {
      setMessages(message);
    };
    socket.on("sendMessage", listener);

    return () => {
      socket.off("sendMessage", listener);
    };
  }, [socket]);

  const filteredMessages = messages.filter((msg: { to: string; }) => msg.to === pathname);

  return (
    <StyledMessagesWrapper>
      <StyledMessageContent ref={messageRef}>
        {filteredMessages.length ?
            filteredMessages?.map((message: any, index: number) => (
            <StyledMessageItem>
              <Message key={index} messageItems={message} socket={socket} />
            </StyledMessageItem>
        )) : null }
      </StyledMessageContent>
      <NewMessageForm socket={socket} />
    </StyledMessagesWrapper>
  );
};

export default Messages;
