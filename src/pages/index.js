import DashboardTable from '_comps/dashboard/DashboardTable';
import supabase from '_supabase';

export default function Dashboard({ data, error, dataKeys }) {
	// If error fetching, display error message, otherwise, render table passing data and dataKeys as props
	return <>{error ? <p>Error Fetching data</p> : <DashboardTable data={data} dataKeys={dataKeys} />}</>;
}

export async function getServerSideProps() {
	// Fetch all entries from supabase (array of objects)
	const { data, error } = await supabase.from('registrations').select();
	// Initialize variable "dataKeys" (object)
	let dataKeys = {};
	if (data) {
		// Populate object "dataKeys" with the keys of the entries and assign an empty value to each one
		for (const key in data[0]) {
			dataKeys[key] = '';
		}
	}
	return {
		props: {
			// Pass the entries (data), the error and the dataKeys as props
			data,
			error,
			dataKeys,
		},
	};
}
