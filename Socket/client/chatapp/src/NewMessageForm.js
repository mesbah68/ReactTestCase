import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';
import Context from "./Context";

const NewMessageForm = ({socket}) => {
    const { user } = useContext(Context);
    const [message, setMessage] = useState('');

    const sendMsg = (e) => {
        e.preventDefault();
        socket.emit('msg', {user, message});
        setMessage('');
    }

    return (
        <div>
            <Form
                autoComplete="off"
            >
                <Input onChange={e => setMessage(e.target.value)} value={message} />
                <Button type="primary" htmlType="submit" onClick={sendMsg}>
                    Submit
                </Button>
            </Form>
        </div>
    )
};

export default NewMessageForm;
