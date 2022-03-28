import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

import Message from "../Message";
import NewMessageForm from "../NewMessageForm";

import { StyledMessagesWrapper, StyledMessageItem, StyledMessageContent } from "./style";
import {
  MessageSelectors,
  useMessageActions,
  UserSelectors,
} from "../../../@redux";

interface Props {
  socket: Socket;
}

const Messages = ({ socket }: Props) => {
  const messages = useSelector(MessageSelectors.getMessagesList);
  const { setMessages } = useMessageActions();
  const user = useSelector(UserSelectors.getUser);

  useEffect(() => {
    const listener = (message: any) => {
      setMessages(message);
    };
    socket.on("sendMessage", listener);

    return () => {
      socket.off("sendMessage", listener);
    };
  }, [socket]);


  return (
    <StyledMessagesWrapper>
      <StyledMessageContent>
        {messages.length ?
        messages?.map((message: any, index: number) => (
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
