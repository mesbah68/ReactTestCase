import React, { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
// @ts-ignore
import { PaperPlaneIcon } from "@iconbox/ion";
// @ts-ignore
import { AttachmentIcon } from "@iconbox/jamicons";
// @ts-ignore
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import HappyIcon from "../../../assets/images/happy.png";

import Context from "../../../Context";

import {
  StyledMessageWrapper,
  StyledEmojiPickerWrapper,
  StyledEmojiIcon,
} from "./style";

interface Props {
  socket: {
    on: any;
    emit: any;
  };
}

const NewMessageForm = ({ socket }: Props) => {
  const { user } = useContext(Context);
  const [message, setMessage] = useState<string>("");
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("msg", { user, message });
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
