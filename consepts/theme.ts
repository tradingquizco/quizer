"use client";
import { theme, ThemeConfig } from "antd";

const antThemeConfig: ThemeConfig = {
  token: {
    borderRadius: 10,
    colorPrimary: "#d89614",
    colorInfo: "#d89614",
    colorWarning: "#fadb14",
    fontSize: 14,
    sizeStep: 4,
    sizeUnit: 4,
    wireframe: false,
  },
  // algorithm: theme.darkAlgorithm
};
export default antThemeConfig;

//todo: create two color pattern, light and dark
//todo: handle color pattern and theme with cookie and zustand
