import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

import Message from "../Message";
import NewMessageForm from "../NewMessageForm";

import { StyledMessagesWrapper, StyledMessageItem, StyledMessageContent } from "./style";
import {
  MessageSelectors,
  useMessageActions,
  ChatSelectors,
} from "../../../@redux";

interface Props {
  socket: Socket;
  data: any;
}

const Messages = ({ socket, data }: Props) => {
  const messages = useSelector(MessageSelectors.getMessagesList);
  const { setMessages } = useMessageActions();
  const messageRef = useRef(null);

  const activeChat = useSelector(ChatSelectors.getActiveChat);

  useEffect(() => {
    setMessages(data?.messages);
  },[data]);

  useEffect(() => {
    const listener = (message: any) => {
      setMessages(message);
    };
    socket.on("sendMessage", listener);

    return () => {
      socket.off("sendMessage", listener);
    };
  }, [socket]);

  const filteredMessages = messages?.filter((msg: { to: string; }) => msg?.to === activeChat?.name);

  return (
    <StyledMessagesWrapper>
      <StyledMessageContent ref={messageRef}>
        {filteredMessages?.length > 0 &&
            filteredMessages?.map((message: any, index: number) => (
            <StyledMessageItem key={index}>
              <Message messageItems={message} socket={socket} />
            </StyledMessageItem>
        ))}
      </StyledMessageContent>
      <NewMessageForm socket={socket} />
    </StyledMessagesWrapper>
  );
};

export default Messages;
