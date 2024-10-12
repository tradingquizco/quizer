"use client";

import { Button, Divider, Empty, Flex } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React, { useEffect, useState, useTransition } from "react";
import PackCard from "./PackCard";
import usePack from "@/lib/store/usePack";
import Link from "next/link";

const PacksContainer = () => {
  const [loading, startTransition] = useTransition();
  const { getAllPacks, getMyAccountPack, myPacks, packs } = usePack();

  const startGetPacks = () =>
    startTransition(() => {
      getMyAccountPack();
    });

  useEffect(() => {
    startGetPacks();

    return () => {
      startGetPacks();
    };
  }, []);

  return (
    <Flex
      className="w-full max-h-[100vh] overflow-y-auto px-5"
      align="start"
      justify="center"
      wrap
      gap={15}
    >
      <Divider>
        <Title>Your Packs</Title>
      </Divider>

      {!loading && myPacks?.length === 0 && (
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
      {myPacks?.map((pack: any) => (
        <PackCard pack={pack} key={pack.id} />
      ))}
    </Flex>
  );
};

export default PacksContainer;
