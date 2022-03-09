import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';
import { SendLightIcon } from '@iconbox/iconly'; 
import Context from "../../../Context";

import { StyledMessageWrapper } from "./style";

const NewMessageForm = ({socket}) => {
    const { user } = useContext(Context);
    const [message, setMessage] = useState('');

    const sendMsg = (e) => {
        e.preventDefault();
        socket.emit('msg', {user, message});
        setMessage('');
    }

    return (
        <StyledMessageWrapper>
            <Form
                autoComplete="off"
                onFinish={sendMsg}
            >
                <Input onChange={e => setMessage(e.target.value)} placeholder="Type Something..." value={message} />
                <Button icon={<SendLightIcon size={3} />} onClick={sendMsg} htmlType="submit" />
                
            </Form>
        </StyledMessageWrapper>
    )
};

export default NewMessageForm;
