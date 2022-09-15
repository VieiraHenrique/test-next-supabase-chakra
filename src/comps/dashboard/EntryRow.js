import { Tr, Td } from '@chakra-ui/react';

export default function EntryRow({ entry }) {
	const entryCells = [];

	for (const key in entry) {
		entryCells.push(entry[key]);
	}

	return <Tr>
        {entryCells.map(cell=>(
            <Td>{cell}</Td>
        ))}
    </Tr>;
}
