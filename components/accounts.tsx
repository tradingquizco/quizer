import { Avatar, Button, MenuProps, Tooltip } from "antd";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import React from "react";

const AccountsList = () => {
  // const session = JSON.parse(cookie);
  // console.log(session);
  // const response = await fetch(`${process.env.API}/accounts/user/${}`)
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
        <Button key="rightButton">2</Button>,
        // React.cloneElement(rightButton as React.ReactElement<any, string>, {
        //   loading: false,
        // }),
      ]}
    >
      mohammad-k13
    </DropdownButton>
  );
};

export default AccountsList;
