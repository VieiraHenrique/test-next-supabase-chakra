import { useRouter } from 'next/router';

export default function Single() {
	const router = useRouter();

	return (
		<>
			<Button onClick={() => toDashboard()}>Back to dashboard</Button>
		</>
	);
}

export async function getServerSideProps() {
	return {
		props: {},
	};
}
