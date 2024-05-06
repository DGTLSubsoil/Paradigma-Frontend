import merge from "lodash.merge";
import { darkTheme, Theme } from "@rainbow-me/rainbowkit";

export const customTheme = merge(darkTheme(), {
  fonts: {
    body: "var(--var-bakbak-one)",
  },
} as Theme);
