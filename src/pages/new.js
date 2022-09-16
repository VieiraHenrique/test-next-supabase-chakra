import { Button, Container, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { commonFunctions } from 'src/context/CommonFunctions';
import AlertBox from '_comps/AlertBox';
import Inputs from '_comps/Inputs';
import supabase from '_supabase';

export default function AddNew() {
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

	const { redirect, checkFields } = useContext(commonFunctions);

	/*//////////////////
		HANDLE FORM SUBMIT FOR NEW ENTRY
	*/ //////////////////

	const handleNewEntry = async (e) => {
		e.preventDefault();

		if (checkFields(formData)) {
			setError(false);
			const { error } = await supabase.from('registrations').insert([formData]);
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

			<Text fontSize={'2xl'}>Create new entry</Text>

			<Button onClick={() => redirect('/')}>Back to dashboard</Button>

			<div>
				<form onSubmit={(e) => handleNewEntry(e)}>
					<Inputs formData={formData} setFormData={setFormData} cta={'Create'} />
				</form>
			</div>
		</Container>
	);
}

export async function getServerSideProps() {
	return {
		props: {},
	};
}
