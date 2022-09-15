import { useEffect, useState } from 'react';
import supabase from '_supabase';

export default function Dashboard({ data, error, dataKeys }) {
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
		<>
			<h1>Test</h1>
			<hr />
			<p>First name</p>
			<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, first_name: e.target.value })} />
			<p>Last name</p>
			<input type="text" onChange={(e) => setFilterInputs({ ...filterInputs, last_name: e.target.value })} />
			{displayedData &&
				displayedData.map((entry) => (
					<div key={entry.id}>
						<ul>
							<li> FIRST NAME: {entry.first_name}</li>
							<li> LAST NAME: {entry.last_name}</li>
						</ul>
						<hr />
					</div>
				))}
		</>
	);
}

export async function getServerSideProps() {
	const { data, error } = await supabase.from('registrations').select();
	let dataKeys = {};
	if (data) {
		for (const key in data[0]) {
			dataKeys[key] = '';
		}
	}
	return {
		props: {
			data,
			error,
			dataKeys,
		},
	};
}
