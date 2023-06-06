'use client';

import React, { ReactNode } from 'react';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';
import getDesignTokens from 'app/theme';

type Props = {
  children: ReactNode;
};

export /**
 * Initializing the mui theme
 *
 * https://github.com/mui/material-ui/issues/34898#issuecomment-1473689035
 * https://docs.tss-react.dev/ssr/next.js#mui-and-tss-use-different-caches
 * @param {Props} { children }
 * @return {*}
 */
const MuiProvider = ({ children }: Props) => {
  // for setting color mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // Update the theme only if the mode changes
  const theme = React.useMemo(
    () => createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light')),
    [prefersDarkMode],
  );

  return (
    <>
      <CssBaseline />
      {/* MUI (but actually underlying Emotion) isn't ready to work with Next's experimental
      `app/` directory feature.
                I'm using the lowest-code approach suggested by this guy here: https://github.com/emotion-js/emotion/issues/2928#issuecomment-1386197925 */}
      <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};

export default MuiProvider;

/* "use client";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
// import { useServerInsertedHTML } from "next/navigation";
// import React, { ReactNode, useState } from "react";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { useMediaQuery } from "@mui/material";
// import getDesignTokens from "app/theme";

// export default function MuiProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//         // for setting color mode
//     const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
//     // Update the theme only if the mode changes
//     const theme = React.useMemo(() =>
createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light')), [prefersDarkMode]);
//   const [{ cache, flush }] = useState(() => {
//     const cache = createCache({ key: "my" });
//     cache.compat = true;
//     const prevInsert = cache.insert;
//     let inserted: string[] = [];
//     cache.insert = (...args) => {
//       const serialized = args[1];
//       if (cache.inserted[serialized.name] === undefined) {
//         inserted.push(serialized.name);
//       }
//       return prevInsert(...args);
//     };
//     const flush = () => {
//       const prevInserted = inserted;
//       inserted = [];
//       return prevInserted;
//     };
//     return { cache, flush };
//   });

//   useServerInsertedHTML(() => {
//     const names = flush();
//     if (names.length === 0) return null;
//     let styles = "";
//     for (const name of names) {
//       styles += cache.inserted[name];
//     }
//     return (
//       <style
//         data-emotion={`${cache.key} ${names.join(" ")}`}
//         dangerouslySetInnerHTML={{
//           __html: styles,
//         }}
//       />
//     );
//   });

//   return (
//     <CacheProvider value={cache}>
//       <ThemeProvider theme={theme}>{children}</ThemeProvider>
//     </CacheProvider>
//   );
 }
 */
