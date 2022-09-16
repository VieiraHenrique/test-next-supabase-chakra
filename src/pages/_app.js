import { ChakraProvider } from '@chakra-ui/react';
import CommonFunctionsProvider from 'src/context/CommonFunctions';
import theme from '_comps/Theme';

export default function MyApp({ Component, pageProps }) {
	return (
		<CommonFunctionsProvider>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</CommonFunctionsProvider>
	);
}
