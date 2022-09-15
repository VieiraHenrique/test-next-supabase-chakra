import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

export default function AlertBox({ title, msg }) {
	return (
		<Alert status="error">
			<AlertIcon />
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription>{msg}</AlertDescription>
		</Alert>
	);
}
