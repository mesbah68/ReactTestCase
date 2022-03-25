import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { Socket } from "socket.io-client";
// import { LoginIcon } from '@iconbox/tabler';
import Context from "../../../Context";

import { StyledChatFormWrapper } from "./style";
import { useUserActions } from "../../../@redux";

interface Props {
  socket: Socket;
}

const EnterChatForm = ({ socket }: Props) => {
  const { setUser } = useUserActions();
  const [localUsername, setLocalUsername] = useState<string>("");

  useEffect(() => {
    const listener = (user: string) => {
      setUser(user);
    };
    socket.on("user", listener);

    return () => {
      socket.off("user", listener);
    };
  }, [socket]);

  const handleEnterChatroom = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(socket);
    console.log(localUsername);
    socket.emit("user", localUsername);
    setLocalUsername("");
  };

  return (
    <StyledChatFormWrapper>
      <Form autoComplete="off" onFinish={handleEnterChatroom}>
        <Input
          onChange={(e) => setLocalUsername(e.target.value)}
          placeholder="Name"
          value={localUsername}
        />
        <Button type="primary" htmlType="submit" onClick={handleEnterChatroom}>
          {/* <LoginIcon /> */}
          Enter...
        </Button>
      </Form>
    </StyledChatFormWrapper>
  );
};

export default EnterChatForm;
