import { Button, Input, Select } from '@chakra-ui/react';

export default function Inputs({ formData, setFormData, cta }) {
	return (
		<>
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
			<Button type="submit">{cta}</Button>
		</>
	);
}
