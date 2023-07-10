import React from "react";
import { MaetIcon } from "app/components/icons";
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
	<div className="grid grid-cols-12 gap-3 h-16 items-center border-b">
		<div className="col-span-5 items-center flex ml-6">
			<Link href="/">
				<div className="flex items center">
					<MaetIcon color="primaryMain"/>
					<text className="text-lg ml-4 text-primaryMain">Maet</text>
				</div>
			</Link>
		</div>
		<div className="col-span-2 items-center justify-center flex-1">
			<div className="flex justify-end items-center relative">
				<input id="search" placeholder="Search" className=" px-2 flex-1 rounded-large h-10 border text-sm placeholder-black"></input>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 -ml-8 stroke-2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
				</svg>
			</div>
		</div>
		<div className="justify-end col-span-5 items-center flex mr-6">
			<ProfileButton/>
			<div className=" w-8 h-8 rounded-full ml-4 bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
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
