import React, { useEffect, useState } from "react";
import { Layout, Segmented } from "antd";
import { Header } from "antd/es/layout/layout";
import PacksContainer from "@/components/packsContainer";

type Align = "start" | "center" | "end";

const App = () => {
  return (
    <Layout className='bg-white'>
      <PacksContainer />
    </Layout>
  );
};

export default App;
