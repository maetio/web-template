// "use client";

// import { DefaultValue, AtomEffect, atom } from "recoil";

// /**
//  * For local storage caching
//  * https://recoiljs.org/docs/guides/atom-effects/
//  */

// // Utility function to get and set the state from/to local storage
// const localStorageEffect =
// 	<T>(key: string): AtomEffect<T> =>
// 		({ setSelf, onSet }) => {
// 			const savedValue = localStorage.getItem(key);
// 			if (savedValue != null) {
// 				setSelf(JSON.parse(savedValue));
// 			}
// 			onSet((newValue, _, isReset) => {
// 				isReset
// 					? localStorage.removeItem(key)
// 					: localStorage.setItem(key, JSON.stringify(newValue));
// 			});
// 		};

// /**
//  * User state for the id and email
//  */
// export const UserState = atom({
// 	key: "userState", // unique ID (with respect to other atoms/selectors)
// 	default: {
// 		id: "",
// 		email: "",
// 	},
// 	effects: [localStorageEffect("userState")],
// });
