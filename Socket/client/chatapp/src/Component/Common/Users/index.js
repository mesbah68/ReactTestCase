import React, { useContext, useEffect, useState } from "react";
import { Button } from 'antd';

import Context from "../../../Context";

import User from "../User";

import { StyledUserWrapper, StyledUserItem } from "./style";

const Users = ({ socket }) => {
    const [users, setUsers] = useState([]);
    const { setUser } = useContext(Context);

    useEffect(() => {
        socket.on('users', users => {
            setUsers(users);
        });
    }, [socket])

    const handleLogout = (e) => {
        e.preventDefault();
        setUser(null);
    }

    return (
        <StyledUserWrapper>
            {users.map((user, index) => (
                <StyledUserItem key={index}>
                    <User user={user} />
                </StyledUserItem>
            ))}
            <Button shape="primary" onClick={handleLogout}>Logout</Button>
        </StyledUserWrapper>
    )
};

export default Users;
