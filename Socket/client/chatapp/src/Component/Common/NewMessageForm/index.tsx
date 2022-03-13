import React, { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
// @ts-ignore
import { PaperPlaneIcon } from "@iconbox/ion";
// @ts-ignore
import { AttachmentIcon } from "@iconbox/jamicons";

import Context from "../../../Context";

import { StyledMessageWrapper } from "./style";

interface Props {
  socket: {
    on: any;
    emit: any;
  };
}

const NewMessageForm = ({ socket }: Props) => {
  const { user } = useContext(Context);
  const [message, setMessage] = useState<string>("");

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("msg", { user, message });
    setMessage("");
  };

  const attachment = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <StyledMessageWrapper>
      <Form autoComplete="off" onFinish={sendMsg}>
        <Input
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here"
          value={message}
        />
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
    </StyledMessageWrapper>
  );
};

export default NewMessageForm;
