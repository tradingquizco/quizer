"use client";

import React, { useEffect, useState } from "react";
import { Segmented } from "antd";
import { Header } from "antd/es/layout/layout";

type Align = "start" | "center" | "end";

const App: React.FC = () => {
  useEffect(() => {
    fetch("http://localhost:8080").then((res) => res);
  }, []);

  const [_, setAlignValue] = useState<Align>("center");
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

    </>
  );
};

export default App;
