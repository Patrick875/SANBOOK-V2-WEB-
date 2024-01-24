import ReactPaginate from "react-paginate";

interface Props {
	itemsPerPage: number;
	dataLength: number;
	setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

function Pages({ itemsPerPage, dataLength, setPageNumber }: Props) {
	const pageCount = dataLength ? Math.ceil(dataLength / itemsPerPage) : null;
	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};
	const paginationComStyles =
		"text-xs  rounded-sm border border-purple-900 py-1 px-2 ";
	const pagNextPrevStyles =
		paginationComStyles +
		"text-purple-900 hover:text-white hover:bg-purple-900 ";
	return (
		<div className="flex justify-center w-full">
			<ReactPaginate
				previousLinkClassName={`${pagNextPrevStyles} `}
				previousLabel="Previous"
				nextLabel="Next"
				activeLinkClassName="text-white bg-purple-900"
				nextLinkClassName={`${pagNextPrevStyles}`}
				pageCount={pageCount}
				pageLinkClassName={`${paginationComStyles}`}
				onPageChange={changePage}
				containerClassName="rounded-sm p-3 bg-white flex gap-3 items-center "
			/>
		</div>
	);
}

export default Pages;
