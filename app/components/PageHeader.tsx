import { Sports } from "@mui/icons-material";
import { Container, Grid, Typography, Divider, Box } from "@mui/material";
import React from "react";

export const PageHeader: React.FC<{}> = () => (
  <Grid
    container
    flexDirection={"row"}
    sx={{
      textAlign: "left",
      flexBasis: "auto",
    }}
  >
    <Typography
      fontFamily={["Nunito", "sans-serif"]}
      color={"#4f46e5"}
      variant="h5"
      fontWeight="800"
    >
      Create a Competition
    </Typography>
    <Sports sx={{ color: "#4f46e5", ml: 1, mt: 0.7 }} />
  </Grid>
);
