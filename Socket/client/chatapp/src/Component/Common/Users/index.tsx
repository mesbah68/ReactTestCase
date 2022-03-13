import React, { useContext, useEffect, useState } from "react";
import { Button } from "antd";

import Context from "../../../Context";

import User from "../User";

import { StyledUserWrapper, StyledUserItem } from "./style";

interface Props {
  socket: {
    on: Function;
  };
}

const Users = ({ socket }: Props) => {
  const [users, setUsers] = useState<
    Array<{
      id: string;
      name: string;
    }>
  >([]);
  const { setUser } = useContext(Context);

  useEffect(() => {
    socket.on("users", (users: any) => {
      setUsers(users);
    });
  }, [socket]);

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(null);
  };

  return (
    <StyledUserWrapper>
      {users.map((user: any, index: number) => (
        <StyledUserItem key={index}>
          <User user={user} />
        </StyledUserItem>
      ))}
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </StyledUserWrapper>
  );
};

export default Users;
