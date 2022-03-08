import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';

const User = ({user}) => {

    return (
        <div>
            <div>
                <div>
                    {/* <UserIcon /> */}
                </div>
            </div>
            <div>
                <span>{user.name}</span>
            </div>
        </div>
    )
};

export default User;
