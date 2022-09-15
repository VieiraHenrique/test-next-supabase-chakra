import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

export default function AlertBox({ status, msg }) {
	return (
		<Alert status={status}>
			<AlertIcon />
			<AlertTitle>{status}</AlertTitle>
			<AlertDescription>{msg}</AlertDescription>
		</Alert>
	);
}
