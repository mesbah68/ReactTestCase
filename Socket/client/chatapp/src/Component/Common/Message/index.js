import React, { useContext, useEffect } from "react";
import { Form, Input, Button } from 'antd';
import Context from "../../../Context";

import { StyledMessageItem } from "./style";

const Message = ({msg}) => {
    const { user } = useContext(Context);

    const isCurrentUser = user.id === msg.user.id;

    return (
        <StyledMessageItem>
            <div className={`bg-${isCurrentUser ? "purple" : "blue" }`}>
                {/* {isCurrentUser ? <span>{msg.user.name}</span> : null} */}
                <span>{msg.message}</span>
            </div>
        </StyledMessageItem>
    )
};

export default Message;
