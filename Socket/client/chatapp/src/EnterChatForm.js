import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';
import Context from "./Context";

const EnterChatForm = ({socket}) => {
    const { setUser } = useContext(Context);
    const [localUser, setLocalUser] = useState('');

    useEffect(() => {
        socket.on('user', user => {
            setUser(user);
        });
    }, [socket])

    const handleEnterChatroom = (e) => {
        e.preventDefault();
        console.log(socket);
        console.log(localUser);
        socket.emit('user', localUser);
        setLocalUser('');
    }

    return (
        <div>
            <Form
                autoComplete="off"
            >
                <Input onChange={e => setLocalUser(e.target.value)} value={localUser} />
                <Button type="primary" htmlType="submit" onClick={handleEnterChatroom}>
                    Submit
                </Button>
            </Form>
        </div>
    )
};

export default EnterChatForm;
