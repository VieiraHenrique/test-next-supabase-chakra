import { useRouter } from 'next/router';

export default function Single() {
	const router = useRouter();

	return <div>Hello world</div>;
}

export async function getServerSideProps() {
	return {
		props: {},
	};
}
