import { Button, Input, Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AlertBox from '_comps/AlertBox';
import supabase from '_supabase';

export default function AddNew() {
	const router = useRouter();
	const [error, setError] = useState(false);

	const [formData, setFormData] = useState({
		travelCode: '',
		email: '',
		firstName: '',
		lastName: '',
		status: 'initialized',
		specialType: 'stdn',
		ticketType: 'fix',
		country: '',
		flightCost: '',
		departureDate: '',
	});

	const toDashboard = () => {
		router.push('/');
	};

	const checkFields = (object) => {
		for (const key in object) {
			if (!object[key]) {
				return false;
			}
		}
		return true;
	};

	const handleNewEntry = (e) => {
		e.preventDefault();

		if (checkFields(formData)) {
			setError(false);
			console.log(formData);
		} else {
			setError(true);
		}
	};

	return (
		<>
			{error && <AlertBox title={'error'} msg={'All fields must be filled'} />}
			<Button onClick={() => toDashboard()}>Back to dashboard</Button>
			<div>
				<form onSubmit={(e) => handleNewEntry(e)}>
					<label>
						Travel Code
						<Input type="text" value={formData.travelCode} onChange={(e) => setFormData({ ...formData, travelCode: e.target.value })} />
					</label>
					<label>
						Email address
						<Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
					</label>
					<label>
						First Name
						<Input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
					</label>
					<label>
						Last Name
						<Input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
					</label>
					<label>
						Status
						<Select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
							<option value="created">Created</option>
							<option value="initialized">Initialized</option>
							<option value="verified">Verified</option>
							<option value="booked">Booked</option>
							<option value="declined">Declined</option>
							<option value="cancelled">Cancelled</option>
						</Select>
					</label>
					<label>
						Special Type
						<Select value={formData.specialType} onChange={(e) => setFormData({ ...formData, specialType: e.target.value })}>
							<option value="stdn">stdn</option>
							<option value="acc">acc</option>
						</Select>
					</label>
					<label>
						Ticket Type
						<Select value={formData.ticketType} onChange={(e) => setFormData({ ...formData, ticketType: e.target.value })}>
							<option value="fix">FIX</option>
							<option value="flex">FLEX</option>
						</Select>
					</label>
					<label>
						Country
						<Input type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
					</label>
					<label>
						Flight Cost
						<Input type="number" value={formData.flightCost} onChange={(e) => setFormData({ ...formData, flightCost: e.target.value })} />
					</label>
					<label>
						Departure Date
						<Input type="date" value={formData.departureDate} onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })} />
					</label>
					<Button type="submit">Create</Button>
				</form>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	return {
		props: {},
	};
}
