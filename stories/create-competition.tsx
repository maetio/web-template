import {
  Autocomplete,
  Grid,
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  ThemeProvider,
  useMediaQuery,
  createTheme,
  Stack,
} from "@mui/material";
import { PageHeader } from "../app/components/PageHeader";
import React from "react";
import { purple } from "@mui/material/colors";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { competitionFormInput } from "app/types/competition";
import { AccountTree, AddCircle, Groups, Tv } from "@mui/icons-material";
import getDesignTokens from "../app/theme";

export const CreateCompetition: React.FC<{}> = () => {
  const { register, control, handleSubmit } = useForm<competitionFormInput>({
    reValidateMode: "onBlur",
  });
  const onSubmit = (data: competitionFormInput) => {
    console.log(data);
  };
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // Update the theme only if the mode changes
  const theme = React.useMemo(
    () => createTheme(getDesignTokens(prefersDarkMode ? "dark" : "light")),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <PageHeader />
      <Box
        mt={2}
        alignItems="center"
        flex={"row"}
        justifyContent={"center"}
        sx={{
          textAlign: "center",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: "#e7e5e4",
            border: 1,
            borderRadius: 1,
            borderColor: "#e7e5e4",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{}}>
              <FormLabel sx={{ color: "#4f46e5", fontWeight: 800 }}>
                Competition Name
              </FormLabel>
              <TextField
                {...register("competitionName")}
                sx={{ margin: 2 }}
                label="Session Name"
              ></TextField>
              <FormLabel sx={{ color: "#4f46e5", fontWeight: 700 }}>
                Sport
              </FormLabel>
              <Controller
                name={"sport"}
                control={control}
                render={({ field: { onChange, onBlur, value }, formState }) => (
                  <Autocomplete
                    sx={{ margin: 2 }}
                    disablePortal
                    options={options}
                    onChange={(_, sport) => {
                      onChange(sport?.label);
                      return sport;
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select Your Sport"
                        label="Select Your Sport"
                      />
                    )}
                  />
                )}
              />
              <FormLabel sx={{ color: "#4f46e5", fontWeight: 700 }}>
                Competition Type
              </FormLabel>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={2}
                m={2}
                sx={{ 
                  backgroundColor: "#f59e0b",
                  border: 1,
                  borderRadius: 1,
                  borderColor: "#f59e0b"
                }}
              >
                <Grid
                  >
                  <Controller
                    name="competitionType"
                    defaultValue={""}
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        defaultValue="Pickup"
                        row
                        onChange={(_, compType) => field.onChange(compType)}
                        value={field.value}
                      >
                        <FormControlLabel
                          value="Pickup"
                          control={<Radio />}
                          label="Pickup"
                        />
                        <FormControlLabel
                          value="Tournament"
                          control={<Radio />}
                          label="Tournament"
                        />
                        <FormControlLabel
                          value="League"
                          control={<Radio />}
                          label="League"
                        />
                      </RadioGroup>
                      
                    )}
                  />
                  </Grid>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormLabel sx={{ color: "#4f46e5", fontWeight: 700 }}>
                  Start Time
                </FormLabel>
                <Controller
                  name={"startDate"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <DatePicker
                      label="Start Date"
                      onChange={(event) => {
                        onChange(event);
                      }}
                    />
                  )}
                />
                <Controller
                  name={"startTime"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TimePicker
                      label="Start Time"
                      onChange={(event) => {
                        onChange(event);
                      }}
                    />
                  )}
                />
                <FormLabel sx={{ color: "#4f46e5", fontWeight: 700 }}>
                  End Time
                </FormLabel>
                <Controller
                  name={"endDate"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <DatePicker
                      label="End Date"
                      onChange={(event) => {
                        onChange(event);
                      }}
                    />
                  )}
                />
                <Controller
                  name={"endTime"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TimePicker
                      label="End Time"
                      onChange={(event) => {
                        onChange(event);
                      }}
                    />
                  )}
                />
                <FormLabel sx={{ color: "#4f46e5", fontWeight: 700 }}>
                  Location
                </FormLabel>
                <TextField
                  {...register("location")}
                  label="Select Location"
                ></TextField>
              </LocalizationProvider>
              <Button
                sx={{ margin: 2, backgroundColor: "#4f46e5" }}
                variant="contained"
                startIcon={<AddCircle />}
                type="submit"
              >
                Create Competition
              </Button>
            </FormControl>
          </form>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

const options = [
  { label: "Paddleball", id: 1 },
  { label: "Basketball", id: 2 },
];
