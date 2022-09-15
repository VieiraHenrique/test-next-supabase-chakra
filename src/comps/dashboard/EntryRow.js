import { Tr, Td, Checkbox } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function EntryRow({ entry, addToDeleteList, removeFromDeleteList }) {
	const router = useRouter();

	const checkCheckbox = (e) => {
		if (e.target.checked) {
			addToDeleteList(entry.id);
		} else {
			removeFromDeleteList(entry.id);
		}
	};

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
				<Checkbox value={entry.id} onChange={(e) => checkCheckbox(e)}></Checkbox>
			</Td>
			{entryCells.map((cell) => (
				<Td onClick={() => toSinglePage()} cursor={'pointer'} key={cell}>
					{cell}
				</Td>
			))}
		</Tr>
	);
}
