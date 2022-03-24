import React, { useContext } from "react";
import { Avatar, Badge } from "antd";

import { UserOutlined } from "@ant-design/icons";
// @ts-ignore
import { EditSquareLightIcon, DeleteLightIcon } from "@iconbox/iconly";

import Context from "../../../Context";
import { MessageItems } from "../../../Constant/GlobalType";
import { StyledAvatarWrapper } from "../User/style";

import {
  StyledMessageItem,
  StyledMessageText,
  StyledIconsWrapper,
} from "./style";

interface Prop {
  message: MessageItems;
  key: number;
}

const Message = ({ message, key }: Prop) => {
  const { user, setMessages, messages } = useContext(Context);
  const isCurrentUser = user.id === message.user.id;
  // @ts-ignore
  // let filteredArray = msg.filter((item) => item !== item[key]);
  return (
    <StyledMessageItem className={isCurrentUser && "currentUser"}>
      <StyledAvatarWrapper>
        <Badge dot>
          <Avatar icon={<UserOutlined />} size="large" />
        </Badge>
      </StyledAvatarWrapper>
      <StyledMessageText>
        <div className={`bg-${isCurrentUser ? "blue" : "white"}`}>
          {/* {isCurrentUser ? <span>{msg.user.name}</span> : null} */}
          {message.message}
        </div>
        <span className={isCurrentUser ? "currentUser" : ""}>8h ago</span>
      </StyledMessageText>
      {isCurrentUser && (
        <StyledIconsWrapper>
          <DeleteLightIcon
            onClick={() => {
              setMessages(null);
            }}
            size={2}
          />
          <EditSquareLightIcon size={2} />
        </StyledIconsWrapper>
      )}
    </StyledMessageItem>
  );
};

export default Message;
