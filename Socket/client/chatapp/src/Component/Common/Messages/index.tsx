import React, { useContext, useEffect } from "react";

import Message from "../Message";
import Context from "../../../Context";

import { StyledMessagesWrapper, StyledMessageItem } from "./style";

interface Props {
  socket: {
    on: any;
    emit: any;
  };
}

const Messages = ({ socket }: Props) => {
  const { messages, setMessages } = useContext(Context);

  useEffect(() => {
    socket.on("msg", (message: string) => {
      setMessages(message);
    });
  }, [socket]);

  return (
    <StyledMessagesWrapper>
      {messages &&
        messages.map((message: any, index: number) => (
          <StyledMessageItem>
            <Message key={index} msg={message} />
          </StyledMessageItem>
        ))}
    </StyledMessagesWrapper>
  );
};

export default Messages;
