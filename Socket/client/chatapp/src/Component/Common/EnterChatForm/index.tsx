import React, { useContext, useEffect, useState } from "react";
import { MouseEvent } from "react";
import { Form, Input, Button } from "antd";
// import { LoginIcon } from '@iconbox/tabler';
import Context from "../../../Context";

import { StyledChatFormWrapper } from "./style";

interface Props {
  socket: {
    on: any;
    emit: any;
  };
}

const EnterChatForm = ({ socket }: Props) => {
  const { setUser } = useContext(Context);
  const [localUser, setLocalUser] = useState<string>("");

  useEffect(() => {
    socket.on("user", (user: string) => {
      setUser(user);
    });
  }, [socket]);

  const handleEnterChatroom = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(socket);
    console.log(localUser);
    socket.emit("user", localUser);
    setLocalUser("");
  };

  return (
    <StyledChatFormWrapper>
      <Form autoComplete="off" onFinish={handleEnterChatroom}>
        <Input
          onChange={(e) => setLocalUser(e.target.value)}
          placeholder="Name"
          value={localUser}
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
