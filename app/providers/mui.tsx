"use client"
import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material"
import { ReactNode } from "react"
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir"
import getDesignTokens from "app/theme";

type Props = {
  children: ReactNode
}

export const MuiSetup = ({ children }: Props) => {
  // for setting color mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light')), [prefersDarkMode]);
    return (
        <>
        <CssBaseline />
        {/* MUI (but actually underlying Emotion) isn't ready to work with Next's experimental `app/` directory feature.
            I'm using the lowest-code approach suggested by this guy here: https://github.com/emotion-js/emotion/issues/2928#issuecomment-1386197925 */}
        <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </NextAppDirEmotionCacheProvider>
        </>
    )
}