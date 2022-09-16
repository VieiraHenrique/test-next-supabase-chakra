import { Button, Text } from '@chakra-ui/react';
import { useState } from 'react';

export default function Pagination({ currentPage, setCurrentPage, totalEntries, entriesPerPage }) {
	const [totalPages, setTotalPages] = useState(Math.ceil(totalEntries / entriesPerPage));

	const handlePrevious = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<div>
			<Text mt={15}>{totalEntries} results</Text>
			<Text>Entries per page: {entriesPerPage}</Text>
			{totalPages > 0 ? (
				<Text mt={15}>
					Page {currentPage} of {totalPages}
				</Text>
			) : (
				''
			)}
			{totalPages > 1 ? (
				<div>
					<Button onClick={() => handlePrevious()}>Previous</Button>
					<Button onClick={() => handleNext()}>Next</Button>
				</div>
			) : (
				''
			)}
		</div>
	);
}
