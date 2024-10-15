"use client";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Drawer } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import EditPackForm from "./editPackForm";
import PermistionMenu from "./premisionMenu";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

interface IAccount {
  username: string;
}

export interface IPack {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  level: "easy" | "medium" | "hard";
  isFree: boolean;
  price: number;
  creatorId: number;
  createdAt: string;
  updatedAt: string;
  account: IAccount;
  quizNumber: number;
  username: string;
  public: boolean;
}

const PackCard = ({ pack }: { pack: IPack }) => {
  const [isEditPackOpen, setIsEditPackOpen] = useState<boolean>();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>();

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="cover-pack"
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGES_URL}/${pack.coverImageUrl}`}
          width={300}
          height={300}
        />
      }
      actions={[
        <SettingOutlined key="setting" onClick={() => setIsSearchOpen(true)} />,
        <EditOutlined key="edit" onClick={() => setIsEditPackOpen(true)} />,
        <EllipsisOutlined key="ellipsis" onClick={() => redirect(`/pack/${pack.id}`,)}/>,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={pack.title}
        description={`Creator - ${pack.username}`}
      />

      <Drawer
        title="Edit Pack"
        onClose={() => setIsEditPackOpen(false)}
        open={isEditPackOpen}
      >
        <EditPackForm pack={pack} />
      </Drawer>

      <Drawer
        title="Set Permisstion"
        onClose={() => setIsSearchOpen(false)}
        open={isSearchOpen}
      >
        <PermistionMenu packId={pack.id} isPackPublic={pack.public} />
      </Drawer>
    </Card>
  );
};

export default PackCard;
