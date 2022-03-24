import React, { useContext, useEffect } from "react";
import { Socket } from "socket.io-client";

import Message from "../Message";
import Context from "../../../Context";

import { StyledMessagesWrapper, StyledMessageItem } from "./style";

interface Props {
  socket: Socket;
}

const Messages = ({ socket }: Props) => {
  const { messages, setMessages } = useContext(Context);

  useEffect(() => {
    const listener = (message: string) => {
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
