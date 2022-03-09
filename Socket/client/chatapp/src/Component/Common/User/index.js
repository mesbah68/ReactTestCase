import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { StyledAvatarWrapper } from "./style";

const User = ({user}) => {

    return (
        <div>
            <div>
                <div>
                    {/* <UserIcon /> */}
                </div>
            </div>
            <div>
                <StyledAvatarWrapper>
                    <Avatar src="https://joeschmoe.io/api/v1/random" icon={<UserOutlined />} size="large" />
                    <span>{user.name}</span>
                </StyledAvatarWrapper> 
            </div>
        </div>
    )
};

export default User;
