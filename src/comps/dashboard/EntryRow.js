import { Tr, Td, Checkbox } from '@chakra-ui/react';

export default function EntryRow({ entry }) {
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
				<Td key={cell}>{cell}</Td>
			))}
		</Tr>
	);
}
