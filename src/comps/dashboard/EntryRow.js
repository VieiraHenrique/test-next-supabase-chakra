import { Tr, Td } from '@chakra-ui/react';
import { useContext } from 'react';
import { commonFunctions } from 'src/context/CommonFunctions';

export default function EntryRow({ entry, addToDeleteList, removeFromDeleteList }) {
	/*//////////////////
		STATES and VARIABLES
	*/ //////////////////
	const { redirect } = useContext(commonFunctions);

	/*//////////////////
		HANDLE SELECTION OF ENTRIES IN DASHBOARD
	*/ //////////////////
	const checkCheckbox = (e) => {
		if (e.target.checked) {
			addToDeleteList(entry.id);
		} else {
			removeFromDeleteList(entry.id);
		}
	};

	/*//////////////////
		POPULATE ROW WITH ENTRY CONTENT
	*/ //////////////////

	const entryCells = [];

	for (const key in entry) {
		entryCells.push(entry[key]);
	}

	/*//////////////////
		COMPONENT
	*/ //////////////////

	return (
		<Tr>
			<Td>
				<input type="checkbox" value={entry.id} onChange={(e) => checkCheckbox(e)}></input>
			</Td>
			{entryCells.map((cell) => (
				<Td onClick={() => redirect(`/${entry.id}`)} cursor={'pointer'} key={cell}>
					{cell}
				</Td>
			))}
		</Tr>
	);
}
