import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import EntryRow from './EntryRow';

export default function DashboardTable({ data, dataKeys }) {
	const [filterInputs, setFilterInputs] = useState(dataKeys);
	const [displayedData, setDisplayedData] = useState(data);

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
			<Table variant="striped" colorScheme="teal">
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
						<Td>
							<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, id: e.target.value })} />
						</Td>
						<Td>
							<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, travel_code: e.target.value })} />
						</Td>
						<Td>
							<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, email: e.target.value })} />
						</Td>
						<Td>
							<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, first_name: e.target.value })} />
						</Td>
						<Td>
							<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, last_name: e.target.value })} />
						</Td>
						<Td>
							<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, status: e.target.value })} />
						</Td>
						<Td>
							<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, special_type: e.target.value })} />
						</Td>
						<Td>
							<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, ticket_type: e.target.value })} />
						</Td>
						<Td>
							<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, country: e.target.value })} />
						</Td>
						<Td>
							<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, flight_cost: e.target.value })} />
						</Td>
						<Td>
							<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, departure_date: e.target.value })} />
						</Td>
					</Tr>
					{displayedData && displayedData.map((entry) => <EntryRow entry={entry} />)}
				</Tbody>
			</Table>
		</TableContainer>
	);
}

// onChange={(e) => setFilterInputs({ ...filterInputs, departure_date: e.target.value })}
