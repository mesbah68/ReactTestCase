import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
// @ts-ignore
import uuid from "react-uuid";
import { Typography, Avatar } from "antd";
// @ts-ignore
import { DeleteLightIcon, EditSquareLightIcon } from "@iconbox/iconly";

import { UserSelectors } from "../../../@redux";

import { StyledAvatarWrapper, StyledUsername } from "./style";


const Setting = () => {
  const user = useSelector(UserSelectors.getUser);

  const { Text } = Typography;

  return (
      <>
        <StyledAvatarWrapper>
           <Avatar
              src="https://joeschmoe.io/api/v1/random"
              icon={<UserOutlined />}
              size={60}
           />
          <StyledUsername>{user[0].name}</StyledUsername>
        </StyledAvatarWrapper>
      </>
  );
};

export default Setting;
