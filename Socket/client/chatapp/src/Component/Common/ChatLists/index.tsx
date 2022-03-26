import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography, Avatar, Input, Modal } from "antd";
import { Socket } from "socket.io-client";
import { UserOutlined } from "@ant-design/icons";
// @ts-ignore
import { DeleteLightIcon, EditSquareLightIcon } from "@iconbox/iconly";
// @ts-ignore
import { MenuIcon } from "@iconbox/jamicons";
// @ts-ignore
import { SearchOutlineIcon } from "@iconbox/eva";

import {
  useMessageActions,
  useContactsActions,
  UserSelectors,
  useUserActions,
  ContactsSelectors,
} from "../../../@redux";

import Channels from "./Channels";
import Group from "../Group";

import {
  StyledChatListWrapper,
  StyledAvatarWrapper,
  StyledUserName,
  StyledSearchWrapper,
  StyledSystemWrapper,
  StyledAddContactWrapper,
  StyledMoreOptionWrapper,
  StyledModalWrapper,
  StyledContactListWrapper,
  StyledUsername,
  StyledIconWrapper,
} from "./style";

interface Props {
  socket: Socket;
}

const ChatList = ({ socket }: Props) => {
  const [contactList, setContactList] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [updatedContactId, setUpdatedContactId] = useState("");

  const user = useSelector(UserSelectors.getUser);
  const contacts = useSelector(ContactsSelectors.getContacts);
  const { setUser } = useUserActions();
  const { setMessages } = useMessageActions();
  const { addContact } = useContactsActions();
  const { deleteContact } = useContactsActions();
  const { updateContact } = useContactsActions();

  const { Title, Text } = Typography;
  const CHANNELSCOUNT = "120";

  useEffect(() => {
    const listener = (user: any) => {
      setUser(user);
    };
    socket.on("users", listener);

    return () => {
      socket.off("users", listener);
    };
  }, [socket]);

  const contactsList = contacts.map(
    (item: { avatar: React.ReactNode; name: string; id: string }) => (
      <StyledAvatarWrapper>
        <Avatar src={item.avatar} size="large" />
        <StyledUsername>{item.name}</StyledUsername>
        <StyledIconWrapper>
          <EditSquareLightIcon
            onClick={() => {
              showEditModal();
              setUpdatedContactId(item.id);
            }}
          />
          <DeleteLightIcon
            onClick={() => {
              deleteContact(item.id);
            }}
          >
            delete
          </DeleteLightIcon>
        </StyledIconWrapper>
      </StyledAvatarWrapper>
    )
  );

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    setUser([]);
    setMessages([]);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    const avatar = "https://joeschmoe.io/api/v1/random";
    addContact({ name: contact, avatar });
    setContactList(false);
    setIsAddModalVisible(false);
  };

  const handleEditContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact({ id: updatedContactId, name: username });
    setIsEditModalVisible(false);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
    setMoreOption(false);
  };

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
  };

  return (
    <StyledChatListWrapper>
      <Title level={4}>
        {user ? (
          <StyledAvatarWrapper>
            <Avatar
              src="https://joeschmoe.io/api/v1/random"
              icon={<UserOutlined />}
              size="large"
            />
            {/* <StyledUserName>{user.name}</StyledUserName> */}
            <MenuIcon size={2.5} onClick={() => setMoreOption(!moreOption)} />
          </StyledAvatarWrapper>
        ) : (
          "Chat"
        )}
      </Title>
      {moreOption && (
        <StyledMoreOptionWrapper>
          <span onClick={showAddModal}>Add contact</span>
          <span
            onClick={() => {
              setContactList(true);
              setMoreOption(false);
            }}
          >
            Contact list
          </span>
        </StyledMoreOptionWrapper>
      )}
      <StyledModalWrapper>
        <Modal
          title="Add Contact"
          visible={isAddModalVisible}
          onCancel={handleCancel}
          onOk={handleAddContact}
          footer={null}
        >
          <StyledAddContactWrapper>
            <Text>Please enter your username</Text>
            <Input
              placeholder="Username"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <Button type="primary" htmlType="submit" onClick={handleAddContact}>
              Add
            </Button>
          </StyledAddContactWrapper>
        </Modal>
      </StyledModalWrapper>
      <StyledModalWrapper>
        <Modal
          title="Edit Contact"
          visible={isEditModalVisible}
          onCancel={handleCancel}
          onOk={handleEditContact}
          footer={null}
        >
          <StyledAddContactWrapper>
            <Text>Please enter your username</Text>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleEditContact}
            >
              accept
            </Button>
          </StyledAddContactWrapper>
        </Modal>
      </StyledModalWrapper>
      {contactList ? (
        <>
          <Title level={4}>Contacts List</Title>
          <StyledContactListWrapper>{contactsList}</StyledContactListWrapper>
        </>
      ) : (
        <>
          <StyledSearchWrapper>
            <Input placeholder="Search" />
            <SearchOutlineIcon size={3} onClick={() => {}} />
          </StyledSearchWrapper>
          <Channels socket={socket} count={CHANNELSCOUNT} />
          <StyledSystemWrapper>
            <Title level={5}>SYSTEM</Title>
            <Group title="General Setting" icon="⚙️" />
            <Group title="Logout" onClick={handleLogout} icon="🔴" />
          </StyledSystemWrapper>
        </>
      )}
    </StyledChatListWrapper>
  );
};

export default ChatList;
