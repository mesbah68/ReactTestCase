import React, { useContext, useEffect } from "react";
import { Socket } from "socket.io-client";

import Message from "../Message";
import Context from "../../../Context";

import { StyledMessagesWrapper, StyledMessageItem } from "./style";
import { useSelector } from "react-redux";
import { MessageSelectors, useMessageActions } from "../../../@redux";

interface Props {
  socket: Socket;
}

const Messages = ({ socket }: Props) => {
  const messages = useSelector(MessageSelectors.getMessagesList);
  const { setMessages } = useMessageActions();

  useEffect(() => {
    const listener = (message: string) => {
      setMessages(message);
    };
    socket.on("msg", listener);

    return () => {
      socket.off("msg", listener);
    };
  }, [socket]);

  console.log("messages===>", messages);

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
