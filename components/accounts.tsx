"use client"

import { Avatar, Button, MenuProps, Tooltip } from "antd";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import React, { useState } from "react";

const AccountsList = () => {
  const items: MenuProps["items"] = [
    {
      label: "mmd-k1234",
      title: "test",
      key: "1",
      icon: (
        <Avatar
          size={28}
          shape="square"
          src="https://avatars.githubusercontent.com/u/88265699?v=4"
        />
      ),
    },
    {
      label: "quizer-mmd",
      key: "2",
      icon: (
        <Avatar
          size={28}
          shape="square"
          src="https://avatars.githubusercontent.com/u/88265699?v=4"
        />
      ),
    },
  ];

  const menuProps = {
    items,
  };
  return (
    <DropdownButton
      menu={menuProps}
      buttonsRender={([leftButton, rightButton]) => [
        <Tooltip title="Change Account" key="leftButton">
          {leftButton}
        </Tooltip>,
        <Button key="rightButton">1</Button>,
      ]}
    >
      mohammad-k13
    </DropdownButton>
  );
};

export default AccountsList;
