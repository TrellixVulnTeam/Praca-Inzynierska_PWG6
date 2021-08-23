import React from "react";
import { Colors, Dark } from "./colors"

export const themes = {
    light: Colors,
    dark: Dark,
};
  
export const ThemeContext = React.createContext({
    theme: themes.light,
    toggleTheme: () => {}
});