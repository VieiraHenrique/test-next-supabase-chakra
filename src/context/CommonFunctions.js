import { useRouter } from 'next/router';

const { createContext } = require('react');

export const commonFunctions = createContext();

export default function CommonFunctionsProvider({ children }) {
	const router = useRouter();

	const redirect = (path) => {
		router.push(path);
	};

	const checkFields = (object) => {
		for (const key in object) {
			if (!object[key]) {
				return false;
			}
		}
		return true;
	};

	const values = { redirect, checkFields };

	return <commonFunctions.Provider value={values}>{children}</commonFunctions.Provider>;
}
