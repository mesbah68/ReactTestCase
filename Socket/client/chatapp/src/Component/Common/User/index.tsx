import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { StyledAvatarWrapper } from "./style";

interface Props {
  user: {
    name: string;
  };
}

const User = ({ user }: Props) => {
  return (
    <div>
      <div>
        <div>{/* <UserIcon /> */}</div>
      </div>
      <div>
        <StyledAvatarWrapper>
          <Avatar
            src="https://joeschmoe.io/api/v1/random"
            icon={<UserOutlined />}
            size="large"
          />
          <span>{user.name}</span>
        </StyledAvatarWrapper>
      </div>
    </div>
  );
};

export default User;
