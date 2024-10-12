"use client"

import React from "react";
import { Layout, message } from "antd";
import CreateQuizForm from "@/components/createQuizFrom";

const page = () => {
  const [messageApi, messageContext] = message.useMessage();
  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      {messageContext}
      <CreateQuizForm messageApi={messageApi}/>
    </Layout>
  );
};

export default page;
