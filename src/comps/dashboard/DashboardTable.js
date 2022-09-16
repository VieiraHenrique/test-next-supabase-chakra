import { useContext, useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, TableContainer, Button, Text } from '@chakra-ui/react';
import EntryRow from './EntryRow';
import { useRouter } from 'next/router';
import supabase from '_supabase';
import DialogAlert from '_comps/DialogAlert';
import { commonFunctions } from 'src/context/CommonFunctions';
import Filter from '_comps/Filter';
import Pagination from '_comps/Pagination';

export default function DashboardTable({ data, dataKeys }) {
	/*//////////////////
		STATES and VARIABLES
	*/ //////////////////
	const [filterInputs, setFilterInputs] = useState(dataKeys);
	const [displayedData, setDisplayedData] = useState(data);
	const [deleteList, setDeleteList] = useState([]);
	const router = useRouter();
	const { redirect } = useContext(commonFunctions);

	/*//////////////////
		PAGINATION STATES AND VARIABLES RELATED
	*/ //////////////////

	const [currentPage, setCurrentPage] = useState(1);
	const entriesPerPage = 5;
	const totalEntries = displayedData.length;
	const [totalPages, setTotalPages] = useState(Math.ceil(totalEntries / entriesPerPage));

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
						<Filter filterInputs={filterInputs} setFilterInputs={setFilterInputs} />

						{displayedData &&
							displayedData

								.map((entry) => <EntryRow key={entry.id} entry={entry} addToDeleteList={addToDeleteList} removeFromDeleteList={removeFromDeleteList} />)}
					</Tbody>
				</Table>
			</TableContainer>

			{!displayedData.length ? <Text as={'b'}>No records found</Text> : ''}
		</>
	);
}
