"use client";

/**
 * Material UI is not yet compatible with server side components
 * This is a temporary workaround so that mui components can be imported into server side components
 * You must import all mui components in server side code here
 *
 * Issue tracking emotion support under the hood for mui: https://github.com/emotion-js/emotion/issues/2928
 * Mui provider with emotion cache: https://docs.tss-react.dev/ssr/next.js#mui-and-tss-use-different-caches
 * Mui issue tracking here: https://github.com/mui/material-ui/issues/34898#issuecomment-1473689035
 *
 */
export { Grid, Button, Box, Typography, TextField, Avatar, Chip, FormLabel, ButtonBase, SvgIcon, Autocomplete, createFilterOptions, InputAdornment } from "@mui/material";
export type { SvgIconProps } from "@mui/material";
export { SportsBasketball, LocationOn, Cancel, DataArray } from "@mui/icons-material";
export { CalendarIcon } from "@mui/x-date-pickers";