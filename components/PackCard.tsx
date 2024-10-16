"use client";

import {
  EditOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Drawer, Dropdown, Flex } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import EditPackForm from "./editPackForm";
import PermistionMenu from "./premisionMenu";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Text from "antd/es/typography/Text";
import PackInformation from "./PackInformation";

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
  category: string;
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
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="cover-pack"
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGES_URL}/${pack.coverImageUrl}`}
          className="w-[300px] h-[300px] object-cover"
        />
      }
      actions={[
        <SettingOutlined key="setting" onClick={() => setIsSearchOpen(true)} />,
        <EditOutlined key="edit" onClick={() => setIsEditPackOpen(true)} />,
        <InfoCircleOutlined key="more" onClick={() => setIsDetailOpen(true)} />,
        <EllipsisOutlined
          key="ellipsis"
          onClick={() => redirect(`/pack/${pack.id}`)}
        />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={pack.title}
        description={
          <Text type="secondary">
            <span className="text-primary">Creator</span> - {pack.username}
          </Text>
          // <Flex vertical className="text-sm w-full">

          //   <Text type="secondary">
          //     <span className="text-primary">Category</span> - {pack.category}
          //   </Text>

          //   <Flex gap={10}>
          //     <Text type="secondary">
          //       <span className="text-primary">Level</span> - {pack.level}
          //     </Text>
          //     <Text type="secondary">
          //       <span className="text-primary">Quizzes</span> -{" "}
          //       {pack.quizNumber}
          //     </Text>
          //   </Flex>
          //   <Text type="secondary">
          //     <span className="text-primary">isFree</span> -{" "}
          //     {pack.isFree ? "yes" : "no"}
          //   </Text>
          //   <Text type="secondary">
          //     <span className="text-primary">Price</span> -{" "}
          //     {pack.price}
          //   </Text>
          // </Flex>
        }
      />
      <Drawer
        title="More Information"
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      >
        <PackInformation pack={pack}/>
      </Drawer>
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
