import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    const listener = (message: any) => {
      setMessages(message);
    };
    socket.on("sendMessage", listener);

    return () => {
      socket.off("sendMessage", listener);
    };
  }, [socket]);

  useEffect(() => {
    // messageRef.scrollTo({
    //   // @ts-ignore
    //   top: messageRef.current.offsetTop,
    //   left: 0,
    //   behavior: "smooth",
    // });
    console.log(messageRef);
  },[messages])


  return (
    <StyledMessagesWrapper>
      <StyledMessageContent ref={messageRef}>
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
