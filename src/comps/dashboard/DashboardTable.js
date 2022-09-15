import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Input, Select, Button, AlertDialog } from '@chakra-ui/react';
import EntryRow from './EntryRow';
import { useRouter } from 'next/router';
import supabase from '_supabase';
import DialogAlert from '_comps/DialogAlert';

export default function DashboardTable({ data, dataKeys }) {
	const [filterInputs, setFilterInputs] = useState(dataKeys);
	const [displayedData, setDisplayedData] = useState(data);
	const [deleteList, setDeleteList] = useState([]);

	const router = useRouter();

	const clearFilters = () => {
		setFilterInputs(dataKeys);
	};

	const addToDeleteList = (id) => {
		setDeleteList([...deleteList, id]);
	};

	const removeFromDeleteList = (id) => {
		setDeleteList(
			deleteList.filter((entry) => {
				return entry !== id;
			})
		);
	};

	const bulkDelete = () => {
		deleteList.forEach(async (id) => {
			const { data, error } = await supabase.from('registrations').delete().eq('id', id);
			router.push('/');
		});
	};

	const toCreatePage = () => {
		router.push('/new');
	};

	useEffect(() => {
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
		<>
			{deleteList.length ? <DialogAlert mr={15} text={'Delete selected entries'} bulkDelete={bulkDelete}  /> : ""}
			<Button mr={15} onClick={() => clearFilters()}>
				Clear filters
			</Button>

			<Button onClick={() => toCreatePage()}>Create new entry</Button>

			<TableContainer>
				<Table>
					<Thead>
						<Tr>
							<Th>Select</Th>
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
							<Td>Select</Td>
							<Td>
								<Input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, id: e.target.value })} />
							</Td>
							<Td>
								<Input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, travel_code: e.target.value })} />
							</Td>
							<Td>
								<Input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, email: e.target.value })} />
							</Td>
							<Td>
								<Input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, first_name: e.target.value })} />
							</Td>
							<Td>
								<Input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, last_name: e.target.value })} />
							</Td>
							<Td>
								<Select onChange={(e) => setFilterInputs({ ...filterInputs, status: e.target.value })}>
									<option value="">ALL</option>
									<option value="created">Created</option>
									<option value="initialized">Initialized</option>
									<option value="verified">Verified</option>
									<option value="booked">Booked</option>
									<option value="declined">Declined</option>
									<option value="cancelled">Cancelled</option>
								</Select>
							</Td>
							<Td>
								<Select onChange={(e) => setFilterInputs({ ...filterInputs, special_type: e.target.value })}>
									<option value="">ALL</option>
									<option value="stdn">stdn</option>
									<option value="acc">acc</option>
								</Select>
							</Td>
							<Td>
								<Select onChange={(e) => setFilterInputs({ ...filterInputs, ticket_type: e.target.value })}>
									<option value="">ALL</option>
									<option value="fix">FIX</option>
									<option value="flex">FLEX</option>
								</Select>
							</Td>
							<Td>
								<Input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, country: e.target.value })} />
							</Td>
							<Td>
								<Input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, flight_cost: e.target.value })} />
							</Td>
							<Td>
								<Input type="date" onChange={(e) => setFilterInputs({ ...filterInputs, departure_date: e.target.value })} />
							</Td>
						</Tr>
						{displayedData && displayedData.map((entry) => <EntryRow key={entry.id} entry={entry} addToDeleteList={addToDeleteList} removeFromDeleteList={removeFromDeleteList} />)}
					</Tbody>
				</Table>
			</TableContainer>

			{!displayedData.length ? <p>No records found</p> : ''}
		</>
	);
}
