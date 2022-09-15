import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import EntryRow from './EntryRow';

export default function DashboardTable({ data, dataKeys }) {
	const [filterInputs, setFilterInputs] = useState(dataKeys);
	const [displayedData, setDisplayedData] = useState(data);

	const keys = [];
	for (const key in dataKeys) {
		keys.push(key);
	}

	useEffect(() => {
		console.log(filterInputs);

		setDisplayedData(
			data.filter((entry) => {
				for (const key in filterInputs) {
					if (!entry[key].toString().toLowerCase().includes(filterInputs[key].toString().toLowerCase())) {
						return false;
					}
				}
				return true;
			})
		);
	}, [filterInputs, data]);

	return (
		<TableContainer>
			<Table>
				<Thead>
					<Tr>
						<Th>Index</Th>
						<Th>Travel code</Th>
						<Th>Email address</Th>
						<Th>First Name</Th>
						<Th>Last Name</Th>
						<Th>Status</Th>
						<Th>Special type</Th>
						<Th>Ticket type</Th>
						<Th>Country</Th>
						<Th>Flight cost</Th>
						<Th>Dprt. date</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						{keys.map((key) => (
							<Td key={key}>
								<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, [key]: e.target.value })} />
							</Td>
						))}
					</Tr>
					{displayedData && displayedData.map((entry) => <EntryRow key={entry.id} entry={entry} />)}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
