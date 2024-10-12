import React, { useEffect, useState, useTransition } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Switch } from "antd";
import EditPackForm from "./editPackForm";
import LoginForm from "./loginForm";
import usePack from "@/lib/store/usePack";

type MenuItem = Required<MenuProps>["items"][number];

const PermistionMenu = ({
  packId,
  isPackPublic,
}: {
  packId: string;
  isPackPublic: boolean;
}) => {
  const { isPublic, togglePublic } = usePack();
  const [loading, startTransition] = useTransition();

  const onChange = (value: boolean) => {
    startTransition(() => {
      togglePublic(packId, value);
    });
  };

  const items: MenuItem[] = [
    {
      disabled: true,
      key: "user",
      label: "User Setting",
      icon: <MailOutlined />,
      children: [
        {
          key: "public",
          label: "Public",
          className: "flex items-center justify-center flex-row-reverse",
          icon: (
            <Switch onChange={onChange} value={isPublic} loading={loading} />
          ),
        },
      ],
    },
    {
      key: "quizer",
      disabled: true,
      label: "Quizer Setting",
      icon: <AppstoreOutlined />,
      children: [
        {
          key: "see",
          label: "See",
          className: "flex items-center justify-center flex-row-reverse",
          icon: <Switch />,
        },
        {
          key: "add",
          label: "Add Quiz",
          className: "flex items-center justify-center flex-row-reverse",
          icon: <Switch />,
        },

        {
          key: "delete",
          label: "Delete Quiz",
          className: "flex items-center justify-center flex-row-reverse",
          icon: <Switch />,
        },
        {
          key: "edit",
          label: "Edit Quiz",
          className: "flex items-center justify-center flex-row-reverse",
          icon: <Switch />,
        },
      ],
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={onClick}
      className="border-none "
      //   defaultSelectedKeys={['1']}
      //   defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default PermistionMenu;
