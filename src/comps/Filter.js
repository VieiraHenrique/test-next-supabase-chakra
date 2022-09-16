import { Input, Select, Td, Tr } from '@chakra-ui/react';

export default function Filter({ filterInputs, setFilterInputs }) {
	return (
		<>
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
		</>
	);
}
