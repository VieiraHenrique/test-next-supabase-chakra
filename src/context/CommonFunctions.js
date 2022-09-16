import { useRouter } from 'next/router';

const { createContext } = require('react');

export const commonFunctions = createContext();

export default function CommonFunctionsProvider({ children }) {
	const router = useRouter();

	const redirect = (path) => {
		router.push(path);
	};

	const values = { redirect };

	return <commonFunctions.Provider value={values}>{children}</commonFunctions.Provider>;
}
