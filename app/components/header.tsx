import React from "react";
import { HeaderMaetIcon } from "app/components/icons";
import { ProfileButton } from "app/components/profile-button";
import Link from "next/link";

export /**
 * Reusable page header/toolbar
 *
 * @param {*} {
 *		title,
 *	}
 *  @return {*}
 *
 */ const Header = () => (
	<div className="grid h-16 grid-cols-12 items-center gap-3 border-b">
		<div className="col-span-3 ml-2 flex items-center">
			<Link href="/">
				<div className="items center flex">
					<HeaderMaetIcon />
					<text className="ml-2 text-lg text-primaryMain">Maet</text>
				</div>
			</Link>
		</div>
		<div className="col-span-6 flex items-center justify-center">
			<div className="relative flex items-center justify-end">
				<input
					id="search"
					placeholder="Search"
					className=" h-10 flex-1 rounded-large border px-2 text-sm placeholder-black"
				></input>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					className="-ml-8 h-5 w-5 stroke-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
			</div>
		</div>
		<div className="col-span-3 mr-2 flex items-center justify-end">
			<ProfileButton />
			<div className=" ml-2 h-8 w-8 rounded-full bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
		</div>
	</div>
	//  <Box sx={{ flexGrow: 1, border: 1, borderColor: "#E5E5E5" }}>
	// 	<AppBar position="static" sx={{backgroundColor: "#FFFFFF"}}>
	// 		<Toolbar>
	// 			<Grid container direction="row" alignItems="center" sx={{ flexGrow: 1, flexShrink: 1 }}>
	// 				<Grid container item xs={3} alignItems="center" justifyContent="center">
	// 					<Link style={{ padding: "8px" }} href="/">

	// 						<MaetIcon color="primary"/>
	// 						<Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#818CF8", ml: 2}}>
	//         				Maet
	// 						</Typography>
	// 					</Link>

	// 				</Grid>
	// 				<Grid container item xs={5} justifyContent="center" alignItems="center">
	// 					<SearchBar label="Search"/>
	// 				</Grid>
	// 				<Grid container item xs={4} justifyContent="flex-end" alignItems="center">
	// 					<ProfileButton />
	// 					<Box
	// 						sx={{
	// 							backgroundImage: "linear-gradient(207deg, #EAE68E 13.76%, #FBBEBE 60.61%, #BEE1FB 100%);",
	// 							borderRadius: "50%",
	// 							width: 40,
	// 							height: 41,
	// 							ml: 2
	// 						}}
	// 					></Box>
	// 				</Grid>
	// 			</Grid>
	// 		</Toolbar>

	// 	</AppBar>
	// </Box>
);
