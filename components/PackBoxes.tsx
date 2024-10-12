"use client";

import { Button, Empty, Flex, Input, Spin } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React, { useEffect, useState, useTransition } from "react";
import { Content } from "antd/lib/layout/layout";
import Link from "next/link";
import usePack from "@/lib/store/usePack";
import clsx from "clsx";
import Search from "antd/es/input/Search";

interface IPack {
  id: string;
  title: string;
  username: string;
  quizNumber: number;
}

const PackBoxes = () => {
  const [packs, setPacks] = useState<IPack[]>([]);
  const [searchPackId, setSearchPackId] = useState<string>();

  const [loading, startTransition] = useTransition();
  const [searchLoading, startSearch] = useTransition();

  const { packId, setPackId } = usePack();

  const getAllPacks = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/packs`);
        const packs = (await response.json()) as IPack[];
        setPacks(packs);
      } catch (err) {
        console.log(err);
        setPacks([]);
      }
    });
  };

  const searchBaseOnId = (id: string) => {
    startSearch(() => {
      if(!id || id.trim() === "") return;
      const selectedPackId = packs.find((pack) => pack.id == id);
      setPacks(selectedPackId ? [selectedPackId] : []);
    });
  };

  useEffect(() => {
    getAllPacks();
  }, []);

  return (
    <Flex vertical align="center" justify="center" gap={17}>
      <Search
        placeholder="Search Base On PackId"
        loading={searchLoading}
        onChange={(e) => searchBaseOnId(e.target.value)}
      />
      <Flex
        justify="center"
        align="center"
        wrap
        gap={15}
        className="h-[350px] overflow-y-auto"
      >
        {loading && <Spin></Spin>}
        {!loading && packs.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ height: 60 }}
            description={
              <Text>
                No <Link href={"/create-pack"}>Packs</Link>
              </Text>
            }
          >
            <Button type="primary">
              <Link href={"/create-pack"}>Create Now</Link>
            </Button>
          </Empty>
        )}
        {!loading &&
          packs.length > 0 &&
          packs.map((item) => (
            <Content
              className={clsx(
                "min-w-[150px] max-w-[250px] min-h-[100px] p-2 border-[1px] border-dashed rounded flex items-center justify-center flex-col cursor-pointer transition-colors overflow-hidden",
                {
                  "bg-primary/15 border-primary": item.id === packId,
                }
              )}
              onClick={() => setPackId(item.id)}
            >
              <Flex align="center" justify="center" gap={5}>
                <Text className="font-bold text-primary">#{item.id}</Text>
                <Text className="text-sm font-bold">{item.title}</Text>
              </Flex>
              <Flex>
                <Text className="text-sm" type="secondary">
                  quizzes:{" "}
                </Text>
                <Text className="text-sm" type="secondary">
                  {item.quizNumber}
                </Text>
              </Flex>

              <Text
                className="text-sm overflow-hidden text-nowrap"
                type="secondary"
              >
                creator: {item.username}
              </Text>
            </Content>
          ))}
      </Flex>
    </Flex>
  );
};

export default PackBoxes;
