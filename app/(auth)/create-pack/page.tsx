"use client";

import CreatePackForm from "@/components/createPackForm";
import { Layout, message } from "antd";
import React from "react";

const page = () => {
  const [messageApi, messageContext] = message.useMessage();
  return (
    <Layout className="" style={{ backgroundColor: "#fff" }}>
      {messageContext}
      <CreatePackForm messageApi={messageApi} />
    </Layout>
  );
};

export default page;
