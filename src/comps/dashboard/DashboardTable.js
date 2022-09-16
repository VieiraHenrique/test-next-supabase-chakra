import { useContext, useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Input, Select, Button, Text } from '@chakra-ui/react';
import EntryRow from './EntryRow';
import { useRouter } from 'next/router';
import supabase from '_supabase';
import DialogAlert from '_comps/DialogAlert';
import { commonFunctions } from 'src/context/CommonFunctions';

export default function DashboardTable({ data, dataKeys }) {
	/*//////////////////
		STATES and VARIABLES
	*/ //////////////////
	const [filterInputs, setFilterInputs] = useState(dataKeys);
	const [displayedData, setDisplayedData] = useState(data);
	const [deleteList, setDeleteList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [entriePerPage, setEntriePerPage] = useState(5);

	const router = useRouter();
	const { redirect } = useContext(commonFunctions);

	/*//////////////////
		FILTER RELATED
	*/ //////////////////
	const clearFilters = () => {
		setFilterInputs(dataKeys);
	};

	/*//////////////////
		BULK DELETE RELATED
	*/ //////////////////

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
			///////////////////// TO DO : handle error
			const { data, error } = await supabase.from('registrations').delete().eq('id', id);

			removeFromDeleteList(id);
			setDeleteList([]);
			router.push('/');
		});
	};

	/*//////////////////
		USE EFFECT
			Used to filter displayedData depending on filterInputs
	*/ //////////////////

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

	/*//////////////////
		COMPONENT
	*/ //////////////////

	return (
		<>
			{deleteList.length ? <DialogAlert mr={15} text={'Delete selected entries'} bulkDelete={bulkDelete} /> : ''}

			<Button mr={15} onClick={() => clearFilters()}>
				Clear filters
			</Button>

			<Button onClick={() => redirect('/new')}>Create new entry</Button>

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
								<Input type="text" value={filterInputs.id} onChange={(e) => setFilterInputs({ ...filterInputs, id: e.target.value })} />
							</Td>
							<Td>
								<Input type="text" value={filterInputs.travel_code} onChange={(e) => setFilterInputs({ ...filterInputs, travel_code: e.target.value })} />
							</Td>
							<Td>
								<Input type="text" value={filterInputs.email} onChange={(e) => setFilterInputs({ ...filterInputs, email: e.target.value })} />
							</Td>
							<Td>
								<Input type="text" value={filterInputs.first_name} onChange={(e) => setFilterInputs({ ...filterInputs, first_name: e.target.value })} />
							</Td>
							<Td>
								<Input type="text" value={filterInputs.last_name} onChange={(e) => setFilterInputs({ ...filterInputs, last_name: e.target.value })} />
							</Td>
							<Td>
								<Select value={filterInputs.status} onChange={(e) => setFilterInputs({ ...filterInputs, status: e.target.value })}>
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
								<Select value={filterInputs.special_type} onChange={(e) => setFilterInputs({ ...filterInputs, special_type: e.target.value })}>
									<option value="">ALL</option>
									<option value="stdn">stdn</option>
									<option value="acc">acc</option>
								</Select>
							</Td>
							<Td>
								<Select value={filterInputs.ticket_type} onChange={(e) => setFilterInputs({ ...filterInputs, ticket_type: e.target.value })}>
									<option value="">ALL</option>
									<option value="fix">FIX</option>
									<option value="flex">FLEX</option>
								</Select>
							</Td>
							<Td>
								<Input type="text" value={filterInputs.country} onChange={(e) => setFilterInputs({ ...filterInputs, country: e.target.value })} />
							</Td>
							<Td>
								<Input type="text" value={filterInputs.flight_cost} onChange={(e) => setFilterInputs({ ...filterInputs, flight_cost: e.target.value })} />
							</Td>
							<Td>
								<Input type="date" value={filterInputs.departure_date} onChange={(e) => setFilterInputs({ ...filterInputs, departure_date: e.target.value })} />
							</Td>
						</Tr>
						{displayedData && displayedData.map((entry) => <EntryRow key={entry.id} entry={entry} addToDeleteList={addToDeleteList} removeFromDeleteList={removeFromDeleteList} />)}
					</Tbody>
				</Table>
			</TableContainer>

			{!displayedData.length ? <Text as={'b'}>No records found</Text> : ''}
		</>
	);
}
