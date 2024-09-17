import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import { Socket } from "socket.io-client";
// @ts-ignore
import uuid from "react-uuid";
// @ts-ignore
import { PaperPlaneIcon } from "@iconbox/ion";
// @ts-ignore
import { AttachmentIcon } from "@iconbox/jamicons";

import { useMutation } from '@apollo/client';
// @ts-ignore
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import HappyIcon from "../../../assets/images/happy.png";

import { ChatSelectors, UserSelectors } from "../../../@redux";
import { getMessagesMutation, getMessagesQuery } from '../../queries';


import {
  StyledMessageWrapper,
  StyledEmojiPickerWrapper,
  StyledEmojiIcon,
} from "./style";


interface Props {
  socket: Socket;
}

const NewMessageForm = ({ socket }: Props) => {
  const user = useSelector(UserSelectors.getUser);
  const [message, setMessage] = useState<string>("");
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);

  const activeChat = useSelector(ChatSelectors.getActiveChat);
  const [messagesMutation] = useMutation(getMessagesMutation);

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", { user, id : uuid(), text: message, to: activeChat.name });
      // messagesMutation({
      //   variables: {
      //     text: message,
      //     id: id,
      //     to: activeChat.name
      //   },
      //   refetchQueries: [{query: getMessagesQuery}]
      // });
    }
    setMessage("");
    setEmojiPicker(false);
  };
  const attachment = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const addEmoji = (e: { native: any }) => {
    const emoji = e.native;
    setMessage(message + emoji);
  };
  return (
    <StyledMessageWrapper>
      <Form autoComplete="off" onFinish={sendMsg}>
        <Input
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here"
          value={message}
        />
        <StyledEmojiIcon
          onClick={() => {
            setEmojiPicker(!emojiPicker);
          }}
        >
          <img src={HappyIcon} />
        </StyledEmojiIcon>
        <Button
          icon={<PaperPlaneIcon size={4} />}
          onClick={sendMsg}
          htmlType="submit"
        />
        <Button
          icon={<AttachmentIcon size={4} />}
          onClick={attachment}
          htmlType="submit"
          className="attach"
        />
      </Form>
      {emojiPicker && (
        <StyledEmojiPickerWrapper>
          <Picker onSelect={addEmoji} />
        </StyledEmojiPickerWrapper>
      )}
    </StyledMessageWrapper>
  );
};

export default NewMessageForm;
