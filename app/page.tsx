"use client";

import React, { useEffect } from "react";
import { Segmented, Tabs } from "antd";
import type { TabsProps } from "antd";
import { Header } from "antd/es/layout/layout";

const onChange = (key: string) => {
  console.log(key);
};
const items: TabsProps["items"] = [
  { key: "1", label: "Tab 1", children: "Content of Tab Pane 1" },
  { key: "2", label: "Tab 2", children: "Content of Tab Pane 2" },
  { key: "3", label: "Tab 3", children: "Content of Tab Pane 3" },
];

type Align = "start" | "center" | "end";

const App: React.FC = () => {
  useEffect(() => {
    fetch("http://localhost:8080").then((res) => res);
  }, []);

  const [alignValue, setAlignValue] = React.useState<Align>("center");
  return (
    <>
      <Header
        style={{
          background: "transparent",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Segmented
          defaultValue="center"
          inputMode="search"
          className="bg-white"
          color="#ccc"
        
          style={{ marginBottom: 8, height: "fit-content" }}
          onChange={(value) => setAlignValue(value as Align)}
          options={["start", "center", "end"]}
        />
      </Header>
      {/* <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        indicator={{ size: (origin) => origin - 20, align: alignValue }}
      /> */}
    </>
  );
};

export default App;
