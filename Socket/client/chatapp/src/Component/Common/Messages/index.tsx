import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

import Message from "../Message";

import { StyledMessagesWrapper, StyledMessageItem } from "./style";
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
    socket.on("msg", listener);

    return () => {
      socket.off("msg", listener);
    };
  }, [socket]);

  return (
    <StyledMessagesWrapper>
      {messages &&
        messages.map((message: any, index: number) => (
          <StyledMessageItem>
            <Message key={index} message={message} />
          </StyledMessageItem>
        ))}
    </StyledMessagesWrapper>
  );
};

export default Messages;
