import {
	Autocomplete,
	Grid,
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
} from "@mui/material";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
	DatePicker,
	DateValidationError,
	LocalizationProvider,
	TimePicker,
	TimeValidationError,
} from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompetitionFormInput } from "app/types/competition-form-types";
import { AddCircle } from "@mui/icons-material";
import { PickerChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types";
import getDesignTokens from "../../../theme";
import { CompetitionFormSchema } from "../../../utils/schemas";
import { PageHeader } from "../../../components/layout/page-header/page";

const options = [
	{ label: "Paddleball", id: 1 },
	{ label: "Basketball", id: 2 },
];

export /**
 * Form that allows user to create competitions
 * and takes user's competition data as an input
 *
 * @param {*} {
 *	}
 *  @return {*}
 *
 */
const CreateCompetition: React.FC<{}> = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CompetitionFormInput>({
		reValidateMode: "onBlur",
		resolver: yupResolver(CompetitionFormSchema),
	});
	const onSubmit = (data: CompetitionFormInput) => {
		console.log(data);
		reset();
	};
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	// Update the theme only if the mode changes
	const theme = React.useMemo(
		() => createTheme(getDesignTokens(prefersDarkMode ? "dark" : "light")),
		[prefersDarkMode]
	);
	return (
		<ThemeProvider theme={theme}>
			<PageHeader title={"Create a Competition"} />
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
							<FormLabel
								sx={{ color: "#4f46e5", fontWeight: 800 }}
							>
								Competition Name
							</FormLabel>
							<TextField
								{...register("competitionName")}
								sx={{ margin: 2 }}
								label="Session Name"
							></TextField>
							<Typography>
								{errors.competitionName?.message}
							</Typography>
							<FormLabel
								sx={{ color: "#4f46e5", fontWeight: 700 }}
							>
								Sport
							</FormLabel>
							<Controller
								name={"sport"}
								control={control}
								render={({
									field: { onChange, onBlur, value },
									formState,
								}) => (
									<Autocomplete
										sx={{ margin: 2 }}
										disablePortal
										options={options}
										onChange={(_, sport) => {
											if (sport) onChange(sport?.label);
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
							<FormLabel
								sx={{ color: "#4f46e5", fontWeight: 700 }}
							>
								Competition Type
							</FormLabel>
							<Box
								display="flex"
								alignItems="center"
								justifyContent="center"
								p={2}
								m={2}
								sx={{
									backgroundColor: "#4f46e5",
									border: 1,
									borderRadius: 1,
									borderColor: "#4f46e5",
								}}
							>
								<Grid>
									<Controller
										name="competitionType"
										defaultValue={""}
										control={control}
										render={({ field }) => (
											<RadioGroup
												{...field}
												defaultValue="Pickup"
												row
												onChange={(_, compType) =>
													field.onChange(compType)
												}
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
							<Typography>
								{errors.competitionType?.message}
							</Typography>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<FormLabel
									sx={{ color: "#4f46e5", fontWeight: 700 }}
								>
									Start Time
								</FormLabel>
								<Controller
									name={"startDate"}
									control={control}
									render={({
										field: { onChange, value: fieldValue },
										fieldState: { error },
									}) => (
										<DatePicker
											label="Start Date"
											onChange={(
												value:
													| Date
													| React.ChangeEvent<Element>
													| null,
												context: PickerChangeHandlerContext<DateValidationError>
											) => {
												if (value) {
													onChange(value);
												}
											}}
											sx={{
												m: 2,
											}}
										/>
									)}
								/>
								<Typography>
									{errors.startDate?.message}
								</Typography>
								<Controller
									name={"startTime"}
									control={control}
									render={({
										field: { onChange, value: fieldValue },
										fieldState: { error },
									}) => (
										<TimePicker
											label="Start Time"
											onChange={(
												value:
													| Date
													| React.ChangeEvent<Element>
													| null,
												context: PickerChangeHandlerContext<TimeValidationError>
											) => {
												if (value) {
													onChange(value);
												}
											}}
											sx={{
												m: 2,
											}}
										/>
									)}
								/>
								<Typography>
									{errors.startTime?.message}
								</Typography>
								<FormLabel
									sx={{ color: "#4f46e5", fontWeight: 700 }}
								>
									End Time
								</FormLabel>
								<Controller
									name={"endDate"}
									control={control}
									render={({
										field: { onChange, value: fieldValue },
										fieldState: { error },
									}) => (
										<DatePicker
											label="End Date"
											onChange={(
												value:
													| Date
													| React.ChangeEvent<Element>
													| null,
												context: PickerChangeHandlerContext<DateValidationError>
											) => {
												if (value) {
													onChange(value);
												}
											}}
											sx={{
												m: 2,
											}}
										/>
									)}
								/>
								<Typography>
									{errors.endDate?.message}
								</Typography>
								<Controller
									name={"endTime"}
									control={control}
									render={({
										field: { onChange, value: fieldValue },
										fieldState: { error },
									}) => (
										<TimePicker
											label="End Time"
											sx={{
												m: 2,
											}}
											onChange={(
												value:
													| Date
													| React.ChangeEvent<Element>
													| null,
												context: PickerChangeHandlerContext<TimeValidationError>
											) => {
												if (value) {
													onChange(value);
												}
											}}
										/>
									)}
								/>
								<Typography>
									{errors.endDate?.message}
								</Typography>
								<FormLabel
									sx={{
										color: "#4f46e5",
										fontWeight: 700,
										m: 2,
									}}
								>
									Location
								</FormLabel>
								<TextField
									{...register("location")}
									label="Select Location"
									sx={{
										m: 2,
									}}
								></TextField>
								<Typography>
									{errors.location?.message}
								</Typography>
							</LocalizationProvider>
							<Button
								sx={{ m: 2, backgroundColor: "#4f46e5" }}
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
