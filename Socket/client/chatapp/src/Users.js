import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';

import User from "./User";

const Users = ({socket}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on('users', users => {
            setUsers(users);
        });
    }, [socket])

    return (
        <ul>
            {users.map((user,index) => (
                <li key={index}>
                    <User user={user} />
                </li>
            ))}
        </ul>
    )
};

export default Users;
