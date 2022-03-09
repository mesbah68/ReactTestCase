import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';
// import { LoginIcon } from '@iconbox/tabler'; 
import Context from "../../../Context";

import { StyledChatFormWrapper } from "./style";

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
        <StyledChatFormWrapper>
            <Form
                autoComplete="off"
                onFinish={handleEnterChatroom}
            >
                <Input onChange={e => setLocalUser(e.target.value)} placeholder="Name" value={localUser} />
                <Button shape="primary" htmlType="submit" onClick={handleEnterChatroom}>
                    {/* <LoginIcon /> */}
                    Enter...
                </Button>
            </Form>
        </StyledChatFormWrapper>
    )
};

export default EnterChatForm;
