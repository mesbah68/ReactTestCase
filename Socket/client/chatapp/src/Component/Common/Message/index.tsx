import React, {useState} from "react";
import { useSelector } from "react-redux";
import {Avatar, Badge, Button, Input, Modal, Typography} from "antd";
import { Socket } from "socket.io-client";

import { UserOutlined } from "@ant-design/icons";
// @ts-ignore
import { EditSquareLightIcon, DeleteLightIcon } from "@iconbox/iconly";

import { UserSelectors, useMessageActions, MessageSelectors } from "../../../@redux";

// import { deleteMessageMutation, getMessagesQuery } from '../../queries';

import { MessageItems } from "../../../Constant/GlobalType";
import { StyledAvatarWrapper } from "../User/style";

import {
  StyledMessageItem,
  StyledMessageText,
  StyledIconsWrapper,
  StyledModalWrapper,
  StyledEditMessageWrapper,
} from "./style";
import {useMutation} from "@apollo/client";

interface Prop {
  messageItems: MessageItems;
  socket: Socket,
}

const Message = ({ messageItems, socket }: Prop) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const { removeMessage, editMessage } = useMessageActions();

  // const [deleteMessage] = useMutation(deleteMessageMutation);

  const {Text} = Typography;
  const { TextArea } = Input;
  // @ts-ignore
  const isCurrentUser = true;
  // const isCurrentUser = user[0]?.id === message?.user[0]?.id;

  const handleRemoveMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("deleteMessage", messageItems.id );
    removeMessage(messageItems?.id);
    // deleteMessage({
    //   variables: {
    //     id: messageItems?.id,
    //   },
    //   refetchQueries: [{query: getMessagesQuery}]
    // });
  }

  const handleEditMessage = (e: React.FormEvent) => {
    e.preventDefault();
    editMessage({id:messageItems?.id, text:textMessage});
    socket.emit("editMessage", {id:messageItems?.id, text: textMessage });
    handleCancel();
  }

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
  };

    return (
    <StyledMessageItem className={isCurrentUser && "currentUser"}>
      <StyledAvatarWrapper>
        <Badge dot>
          <Avatar size="large" >{messageItems.to}</Avatar>
        </Badge>
      </StyledAvatarWrapper>
      <StyledMessageText>
        <div className={`bg-${isCurrentUser ? "blue" : "white"}`}>
          {messageItems?.text}
        </div>
        <span className={isCurrentUser ? "currentUser" : ""}>8h ago</span>
      </StyledMessageText>
      {isCurrentUser && (
        <StyledIconsWrapper>
          <DeleteLightIcon
            onClick={handleRemoveMessage}
            size={2}
          />
          <EditSquareLightIcon size={2} onClick={showEditModal}  />
        </StyledIconsWrapper>
      )}
      <StyledModalWrapper>
        <Modal
            title="Edit message"
            visible={isEditModalVisible}
            onCancel={handleCancel}
            onOk={handleEditMessage}
            footer={[
              <Button
                  type="link"
                  onClick={handleCancel}
              >
                Cancle
              </Button>,
              <Button key="submit" type="primary" className="chat-btn" onClick={handleEditMessage}>
                Edit
              </Button>,
            ]}
        >
          <StyledEditMessageWrapper>
            <Text>Enter your text message</Text>
            <TextArea
                placeholder="Text"
                value={textMessage}
                rows={4}
                onChange={(e) => setTextMessage(e.target.value)}
            />
          </StyledEditMessageWrapper>
        </Modal>
      </StyledModalWrapper>
    </StyledMessageItem>
  );
};

export default Message;
