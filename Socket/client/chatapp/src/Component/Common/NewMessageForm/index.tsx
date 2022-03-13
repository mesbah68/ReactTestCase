import React, { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
// @ts-ignore
import { SendLightIcon } from "@iconbox/iconly";
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

  return (
    <StyledMessageWrapper>
      <Form autoComplete="off" onFinish={sendMsg}>
        <Input
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type Something..."
          value={message}
        />
        <Button
          icon={<SendLightIcon size={3} />}
          onClick={sendMsg}
          htmlType="submit"
        />
      </Form>
    </StyledMessageWrapper>
  );
};

export default NewMessageForm;
