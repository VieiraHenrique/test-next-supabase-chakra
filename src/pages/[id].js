import { Button, Container, Input, Select, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { commonFunctions } from 'src/context/CommonFunctions';
import AlertBox from '_comps/AlertBox';
import Inputs from '_comps/Inputs';
import supabase from '_supabase';

export default function Single({ entry }) {
	/*//////////////////
		STATES and VARIABLES
	*/ //////////////////

	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [formData, setFormData] = useState({
		travel_code: entry.travel_code,
		email: entry.email,
		first_name: entry.first_name,
		last_name: entry.last_name,
		status: entry.status,
		special_type: entry.special_type,
		ticket_type: entry.ticket_type,
		country: entry.country,
		flight_cost: entry.flight_cost,
		departure_date: entry.departure_date,
	});

	const { redirect, checkFields } = useContext(commonFunctions);

	/*//////////////////
		HANDLE FORM SUBMIT FOR UPDATE ENTRY
	*/ //////////////////

	const handleUpdateEntry = async (e) => {
		e.preventDefault();

		if (checkFields(formData)) {
			setError(false);
			const { error } = await supabase.from('registrations').update(formData).eq('id', entry.id);
			if (!error) {
				setSuccess(true);
				setTimeout(() => {
					redirect('/');
				}, 2000);
			}
		} else {
			setError(true);
			return;
		}
	};

	/*//////////////////
		COMPONENT
	*/ //////////////////

	return (
		<Container>
			{error && <AlertBox status={'error'} msg={'All fields must be filled'} />}

			{success && <AlertBox status={'success'} msg={'You will be redirected to the dashboard in 2 seconds'} />}

			<Text fontSize={'2xl'}>Update entry</Text>

			<Button onClick={() => redirect('/')}>Back to dashboard</Button>

			<div>
				<form onSubmit={(e) => handleUpdateEntry(e)}>
					<Inputs formData={formData} setFormData={setFormData} cta={'Update entry'} />
				</form>
			</div>
		</Container>
	);
}

export async function getServerSideProps({ params }) {
	// Fetch singular entry from supabase (array of objects)
	const { data, error } = await supabase.from('registrations').select().eq('id', params.id);

	return {
		props: {
			entry: data[0],
		},
	};
}
