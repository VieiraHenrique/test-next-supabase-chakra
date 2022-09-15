import { useEffect, useState } from 'react';
import supabase from '_supabase';

export default function Dashboard({ data, error, dataKeys }) {
	const [filterData, setFilterData] = useState(dataKeys);
	const [filteredResult, setFilteredResult] = useState(data);

	useEffect(() => {
		setFilteredResult(
			filteredResult.filter((entry) => {
				for (const key in filterData) {
					if (!entry[key].toString().toLowerCase().includes(filterData[key].toString().toLowerCase())) {
						return false;
					}
				}

				return true;
			})
		);
	}, [filterData]);

	return (
		<>
			<h1>Test</h1>
			<p>Fist Name</p>
			<input
				type="text"
				onChange={(e) => {
					setFilterData({ ...filterData, first_name: e.target.value });
				}}
			/>
			<p>Last Name</p>
			<input
				type="text"
				onChange={(e) => {
					setFilterData({ ...filterData, last_name: e.target.value });
				}}
			/>
			<hr />
			<hr />
			{filteredResult &&
				filteredResult.map((entry) => (
					<div key={entry.id}>
						<ul>
							<li>ID: {entry.id}</li>
							<li>FIRST_NAME: {entry.first_name}</li>
							<li>LAST NAME: {entry.last_name}</li>
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
