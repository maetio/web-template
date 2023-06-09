import {
  Autocomplete,
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
import { AddCircle } from "@mui/icons-material";

export const CreateCompetition: React.FC<{}> = () => {
  const { register, control, handleSubmit } = useForm<competitionFormInput>({
    reValidateMode: "onBlur",
  });
  const onSubmit = (data: competitionFormInput) => {
    console.log(data);
  }

  return (
    <Box
      m={2}
      alignItems="center"
      flex={"row"}
      sx={{
        height: 1,
        width: 1,
        textAlign: "center",
        padding: "3px",
      }}
    >
      <PageHeader />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{}}>
          <FormLabel>Competition Name</FormLabel>
          <TextField
            {...register("competitionName")}
            sx={{ margin: 2 }}
            label="Session Name"
          ></TextField>
          <FormLabel>Sport</FormLabel>
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
          <FormLabel>Competition Type</FormLabel>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormLabel>Start Time</FormLabel>
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
            <FormLabel>End Time</FormLabel>
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
            <TextField
              {...register("location")}
              label="Select Location"
            ></TextField>
          </LocalizationProvider>
          <Button sx={{ margin: 2 }} variant="contained" startIcon={<AddCircle />} type="submit">
            Create Competition
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

const options = [
  { label: "Paddleball", id: 1 },
  { label: "Basketball", id: 2 },
];
