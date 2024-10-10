"use client";

import Header from "@/components/header";
import antThemeConfig from "@/consepts/theme";
import { ConfigProvider, Layout, Menu, theme } from "antd";
import { ThemeProvider } from "antd-style";
import { Content } from "antd/es/layout/layout";
import useToken from "antd/es/theme/useToken";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const {
    "1": { colorBgBase },
  } = useToken();
  const pathname = usePathname();
  return (
    <ConfigProvider
      theme={{ ...antThemeConfig }}
    >
      {/* <ThemeProvider > */}
        {pathname !== "/login" && <Header />}
        <Layout
          style={{
            minHeight: 'calc(100vh - 3.5rem - 24px)',
            padding: "12px",
            gap: "12px",
            backgroundColor: colorBgBase
            // backgroundColor: colorWhite,
          }}
        >
          <Content>{children}</Content>
        </Layout>
      {/* </ThemeProvider> */}
    </ConfigProvider>
  );
};

export default LayoutProvider;
