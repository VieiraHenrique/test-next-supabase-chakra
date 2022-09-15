
import Table from '_comps/dashboard/DashboardTable';
import supabase from '_supabase';

export default function Dashboard({ data, error, dataKeys }) {
	return <>{error ? <p>Error Fetching data</p> : <Table data={data} dataKeys={dataKeys} />}</>;
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
