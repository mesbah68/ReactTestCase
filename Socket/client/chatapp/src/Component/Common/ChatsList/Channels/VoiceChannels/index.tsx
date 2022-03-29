import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import {
  ArrowDown2TwoToneIcon,
  ArrowUp2TwoToneIcon,
  VolumeUpCurvedIcon,
  // @ts-ignore
} from "@iconbox/iconly";

import User from "../../../User";
import Group from "../../../Group";
import { UserItems } from "../../../../../Constant/GlobalType";

import {
  StyledVoiceChannelsWrapper,
  StyledUserItem,
  StyledHeaderWrapper,
} from "./style";

interface Props {
  socket: Socket;
  count?: string;
}

const VoiceChannels = ({ socket, count }: Props) => {
  const [users, setUsers] = useState<UserItems[]>([]);
  const [toggleIcon, setToggleIcon] = useState(true);

  useEffect(() => {
    socket.on("users", (users: any) => {
      setUsers(users);
    });
  }, [socket]);

  const handleChangeIcon = (e: React.FormEvent) => {
    e.preventDefault();
    setToggleIcon(!toggleIcon);
  };

  return (
    <StyledVoiceChannelsWrapper>
      <StyledHeaderWrapper onClick={handleChangeIcon}>
        <span>VOICE CHANNELS</span>
        {toggleIcon ? (
          <ArrowUp2TwoToneIcon onClick={handleChangeIcon} />
        ) : (
          <ArrowDown2TwoToneIcon onClick={handleChangeIcon} />
        )}
      </StyledHeaderWrapper>
      {toggleIcon &&
        users.map((user: any, index: number) => (
          <StyledUserItem key={index}>
            <User user={user} icon={<VolumeUpCurvedIcon size={2} />} />
          </StyledUserItem>
        ))}
      {toggleIcon && (
        <>
          <Group title="Podchess" icon="🎤" detail="3/5" />
          <Group title="Design Terus" icon="🎨" detail="0/5" />
          <Group title="Bincang Caem" icon="🤑" detail="0/5" />
        </>
      )}
    </StyledVoiceChannelsWrapper>
  );
};

export default VoiceChannels;