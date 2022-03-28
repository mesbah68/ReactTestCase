import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import { Socket } from "socket.io-client";

import { UserOutlined } from "@ant-design/icons";
// @ts-ignore
import { EditSquareLightIcon, DeleteLightIcon } from "@iconbox/iconly";

import { UserSelectors, useMessageActions, MessageSelectors } from "../../../@redux";

import { MessageItems } from "../../../Constant/GlobalType";
import { StyledAvatarWrapper } from "../User/style";

import {
  StyledMessageItem,
  StyledMessageText,
  StyledIconsWrapper,
} from "./style";

interface Prop {
  messageItems: MessageItems;
  socket: Socket,
  key: number;
}

const Message = ({ messageItems, key, socket }: Prop) => {
  // const user = useSelector(UserSelectors.getUser);
  // const messages = useSelector(MessageSelectors.getMessagesList);
  const { removeMessage } = useMessageActions();
  // @ts-ignore
  const isCurrentUser = true;
  // const isCurrentUser = user[0]?.id === message?.user[0]?.id;

  const handleRemoveMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("deleteMessage", messageItems.messages.id );
    removeMessage(messageItems?.messages?.id);
  }

    return (
    <StyledMessageItem className={isCurrentUser && "currentUser"}>
      <StyledAvatarWrapper>
        <Badge dot>
          <Avatar icon={<UserOutlined />} size="large" />
        </Badge>
      </StyledAvatarWrapper>
      <StyledMessageText>
        <div className={`bg-${isCurrentUser ? "blue" : "white"}`}>
          {messageItems?.messages?.text}
        </div>
        <span className={isCurrentUser ? "currentUser" : ""}>8h ago</span>
      </StyledMessageText>
      {isCurrentUser && (
        <StyledIconsWrapper>
          <DeleteLightIcon
            onClick={handleRemoveMessage}
            size={2}
          />
          <EditSquareLightIcon size={2}  />
        </StyledIconsWrapper>
      )}
    </StyledMessageItem>
  );
};

export default Message;
