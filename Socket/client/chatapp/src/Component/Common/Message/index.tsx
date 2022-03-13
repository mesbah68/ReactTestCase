import React, { useContext } from "react";
import Context from "../../../Context";

import { StyledMessageItem } from "./style";

interface MessageProp {
  msg: {
    user: {
      id: string;
    };
    message: string;
  };
}

const Message = ({ msg }: MessageProp) => {
  const { user } = useContext(Context);

  const isCurrentUser = user.id === msg.user.id;

  return (
    <StyledMessageItem>
      <div className={`bg-${isCurrentUser ? "purple" : "gray"}`}>
        {/* {isCurrentUser ? <span>{msg.user.name}</span> : null} */}
        <span>{msg.message}</span>
      </div>
    </StyledMessageItem>
  );
};

export default Message;
