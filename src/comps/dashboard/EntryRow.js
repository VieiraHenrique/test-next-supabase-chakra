export default function EntryRow({ entry }) {
	return (
		<ul>
			<li>{entry.first_name}</li> <li>{entry.last_name}</li> <li>{entry.departure_date}</li>
		</ul>
	);
}
