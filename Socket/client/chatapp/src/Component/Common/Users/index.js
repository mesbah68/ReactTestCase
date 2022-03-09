import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';

import User from "../User";

import { StyledUserWrapper, StyledUserItem } from "./style";

const Users = ({socket}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on('users', users => {
            setUsers(users);
        });
    }, [socket])

    return (
        <StyledUserWrapper>
            {users.map((user,index) => (
                <StyledUserItem key={index}>
                    <User user={user} />
                </StyledUserItem>
            ))}
        </StyledUserWrapper>
    )
};

export default Users;
