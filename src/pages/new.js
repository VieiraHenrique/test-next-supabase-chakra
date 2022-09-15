import { Button, Input, Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AlertBox from '_comps/AlertBox';
import supabase from '_supabase';

export default function AddNew() {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const [formData, setFormData] = useState({
		travel_code: '',
		email: '',
		first_name: '',
		last_name: '',
		status: 'initialized',
		special_type: 'stdn',
		ticket_type: 'fix',
		country: '',
		flight_cost: '',
		departure_date: '',
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

	const handleNewEntry = async (e) => {
		e.preventDefault();

		if (checkFields(formData)) {
			setError(false);
			console.log(formData);
			const { data, error } = await supabase.from('registrations').insert([formData]);
			if (!error) {
				setSuccess(true);
				setTimeout(() => {
					router.push('/')	
				}, 3000);
			}
		} else {
			setError(true);
			return;
		}
	};

	return (
		<>
			{error && <AlertBox status={'error'} msg={'All fields must be filled'} />}
			{success && <AlertBox status={'success'} msg={'You will be redirected to the dashboard in 3 seconds'} />}
			<Button onClick={() => toDashboard()}>Back to dashboard</Button>
			<div>
				<form onSubmit={(e) => handleNewEntry(e)}>
					<label>
						Travel Code
						<Input type="text" value={formData.travel_code} onChange={(e) => setFormData({ ...formData, travel_code: e.target.value })} />
					</label>
					<label>
						Email address
						<Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
					</label>
					<label>
						First Name
						<Input type="text" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
					</label>
					<label>
						Last Name
						<Input type="text" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
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
						<Select value={formData.special_type} onChange={(e) => setFormData({ ...formData, special_type: e.target.value })}>
							<option value="stdn">stdn</option>
							<option value="acc">acc</option>
						</Select>
					</label>
					<label>
						Ticket Type
						<Select value={formData.ticket_type} onChange={(e) => setFormData({ ...formData, ticket_type: e.target.value })}>
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
						<Input type="number" value={formData.flight_cost} onChange={(e) => setFormData({ ...formData, flight_cost: e.target.value })} />
					</label>
					<label>
						Departure Date
						<Input type="date" value={formData.departure_date} onChange={(e) => setFormData({ ...formData, departure_date: e.target.value })} />
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
