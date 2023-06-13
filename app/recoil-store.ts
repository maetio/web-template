import {
	DefaultValue,
	AtomEffect,
	atom
} from "recoil";

/**
 * For local storage caching
 * https://recoiljs.org/docs/guides/atom-effects/
 */
type PersistenceOptions<T> = {
	key: string,
	validate: T,
};

// Utility function to get and set the state from/to local storage
const getLocalStorage = <T>(key: string): T | null => {
	const storedValue = localStorage.getItem(key);
	return storedValue ? JSON.parse(storedValue) : null;
};
  
const setLocalStorage = <T>(key: string, value: T): void => {
	localStorage.setItem(key, JSON.stringify(value));
};

const localStorageEffect = <T>(key: string): AtomEffect<T> => ({ setSelf, onSet }) => {
	const savedValue = localStorage.getItem(key)
	if (savedValue != null) {
	  setSelf(JSON.parse(savedValue));
	}
	onSet((newValue, _, isReset) => {
	  isReset
		? localStorage.removeItem(key)
		: localStorage.setItem(key, JSON.stringify(newValue));
	});
  };
  
{/* function localStorageEffect = (key: string) => ({setSelf, onSet}: AtomEffect) => {
	const savedValue = localStorage.getItem(key)
	if (savedValue != null) {
	  setSelf(JSON.parse(savedValue));
	}
  
	onSet((newValue, _, isReset) => {
	  isReset
		? localStorage.removeItem(key)
		: localStorage.setItem(key, JSON.stringify(newValue));
	});
  }; */}





export const UserState = atom({
	key: "userState", // unique ID (with respect to other atoms/selectors)
	default: {
		id: "",
		email: ""
	},
	effects: [localStorageEffect('userState')],
});
