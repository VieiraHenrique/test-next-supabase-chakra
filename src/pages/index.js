import { Text } from '@chakra-ui/react';

import Col from '_comps/Layout/Col';
import Container from '_comps/Layout/Container';

export default function Dashboard() {
	return (
		<Container>
			<Col>
				<Text>Dashboard page</Text>
			</Col>
		</Container>
	);
}

export async function getServerSideProps() {
	return {
		props: {},
	};
}
