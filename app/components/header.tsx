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
	<div className="bg-gray-50 grid grid-cols-12 gap-3 items-center">
		<div className="col-span-4 items-center flex ml-2">
			<Link href="/">
				<MaetIcon/>
				<p className="text-sm ml-2">Maet</p>
			</Link>
		</div>
		<div className="col-span-4 items-center justify-center flex">
			<input id="search" placeholder="Search..." className="rounded h-6"></input>
		</div>
		<div className="justify-end col-span-4 items-center flex mr-2">
			<ProfileButton/>
			<div className=" w-12 h-12 rounded-full  bg-gradient-to-b from-purple-600 to-blue-600"></div>
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
