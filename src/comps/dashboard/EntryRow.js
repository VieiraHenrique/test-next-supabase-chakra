import { Tr, Td, Checkbox } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function EntryRow({ entry }) {
	const router = useRouter();

	const toSinglePage = () => {
		router.push(`/${entry.id})`);
	};

	const entryCells = [];

	for (const key in entry) {
		entryCells.push(entry[key]);
	}

	return (
		<Tr>
			<Td>
				<Checkbox value={entry.id}></Checkbox>
			</Td>
			{entryCells.map((cell) => (
				<Td onClick={() => toSinglePage()} cursor={'pointer'} key={cell}>
					{cell}
				</Td>
			))}
		</Tr>
	);
}
