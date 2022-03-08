import React, { useContext } from "react";
import { Form, Input, Button } from 'antd';
import Context from "../../../Context";

const Message = ({msg}) => {
    const { user } = useContext(Context);

    const isCurrentUser = user.id === msg.user.id;

    return (
        <div>
            {isCurrentUser ? <span>{msg.user.name}</span> : null}
            <span>{msg.message}</span>
        </div>
    )
};

export default Message;
