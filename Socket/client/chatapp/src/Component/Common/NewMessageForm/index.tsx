import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Form, Input, Button } from "antd";
import { Socket } from "socket.io-client";
// @ts-ignore
import uuid from "react-uuid";
// @ts-ignore
import { PaperPlaneIcon } from "@iconbox/ion";
// @ts-ignore
import { AttachmentIcon } from "@iconbox/jamicons";
// @ts-ignore
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import HappyIcon from "../../../assets/images/happy.png";

import { MessageSelectors, UserSelectors, useMessageActions } from "../../../@redux";

import {
  StyledMessageWrapper,
  StyledEmojiPickerWrapper,
  StyledEmojiIcon,
} from "./style";
import {useSelector} from "react-redux";

interface Props {
  socket: Socket;
}

const NewMessageForm = ({ socket }: Props) => {
  const user = useSelector(UserSelectors.getUser);
  const [message, setMessage] = useState<string>("");
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);

  const location = useLocation();
  const pathname = location.pathname.split('/')[1];

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      const id = uuid();
      const messages = { text: message, id : id};
      socket.emit("sendMessage", { user, messages, to: pathname });
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
