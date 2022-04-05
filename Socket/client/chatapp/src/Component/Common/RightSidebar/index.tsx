import React from "react";
import { Socket } from "socket.io-client";
import { Drawer, Typography } from "antd";

import ContactsList from "../ContactsList";
import Profile from "../Profile";
import Setting from "../Setting";

import { StyledSidebarWrapper, StyledSidebarTitleWrapper, StyledSidebarContentWrapper } from "./style";

interface Props {
  socket: Socket;
  sidebarTitle: string,
}

const RightSidebar = ({ socket, sidebarTitle }: Props) => {
  const { Title } = Typography;

  return (
      <Drawer
          placement="right"
          width="25%"
          mask={false}
          visible={!!sidebarTitle}
          closable={false}
          className="sidebar"
          contentWrapperStyle={{boxShadow: "none"}}
      >
          <StyledSidebarWrapper>
              <StyledSidebarTitleWrapper>
                  <Title level={2} >{sidebarTitle}</Title>
              </StyledSidebarTitleWrapper>
              <StyledSidebarContentWrapper>
                  {sidebarTitle === "Contacts" ?
                    <ContactsList socket={socket} />
                    : sidebarTitle === "Profile" ?
                    <Profile />
                    : sidebarTitle === "Setting" &&
                    <Setting />
                  }
              </StyledSidebarContentWrapper>
          </StyledSidebarWrapper>
      </Drawer>
  );
};

export default RightSidebar;
