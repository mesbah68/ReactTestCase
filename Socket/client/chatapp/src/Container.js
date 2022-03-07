// ignore eslint
import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Context from "./Context";

const Container = () => {
    const { user, setUser } = useContext(Context);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:4000");
        setSocket(newSocket);
        setUser(null);
    }, [])

    console.log('sjlajdflaj',!user && socket && socket.connected);
    return (
        <div>
            <h1>
                {user ? `chatting as ${user.name} ` : 'chat as ...'}
            </h1>
            {user && socket && socket.connected ? (<div>connected</div>) : null }
            {!user && socket ? (<div>not connected</div>) : null }
        </div>
    )
};

export default Container;
