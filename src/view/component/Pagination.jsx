

export const PaginationEl = ({ setCurrentPage, currentPage, totalPages }) => {
    return (
        <div className="flex justify-center items-center mt-6 space-x-3">
            {/* Tombol Previous */}
            <button
                // onClick={() => setCurrentPage(currentPage - 1)}
                onClick={() => setCurrentPage('prev')}
                disabled={currentPage === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Previous
            </button>

            {/* Informasi halaman */}
            <span className="text-lg text-gray-700">
                Page {currentPage + 1} of {totalPages}
            </span>

            {/* Tombol Next */}
            <button
                // onClick={() => setCurrentPage(currentPage + 1)}
                onClick={() => setCurrentPage('next')}
                disabled={currentPage === totalPages - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    )
}


export const PaginationNativeEl = ({
    generatePageNumbers,
    paginatePage,
    setPaginatePage,
    paginateTotalPage,
    paginateTotalItem,
}) => {
    const LINK_PAGEINATE_ACTIVE =
        "z-10 flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-dark-mode-v2 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white";
    const LINK_PAGINATE_DEACTIVE =
        "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";

    return (
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center w-full">
            <div className="dark:text-white">Total : {paginateTotalItem}</div>
            <nav aria-label="Page navigation" className="w-full sm:w-auto overflow-x-auto">
                <ul className="flex flex-wrap justify-center sm:justify-start items-center gap-2 w-full">
                    <li>
                        <button
                            disabled={paginatePage === 0}
                            onClick={() => setPaginatePage(paginatePage - 1)}
                            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <svg
                                className="w-3 h-3 rtl:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                        </button>
                    </li>
                    {generatePageNumbers?.map((page, i) => (
                        <li key={i}>
                            <button
                                onClick={() => setPaginatePage(page - 1)}
                                className={page === paginatePage ? LINK_PAGEINATE_ACTIVE : LINK_PAGINATE_DEACTIVE}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            disabled={paginatePage === paginateTotalPage - 1}
                            onClick={() => setPaginatePage(paginatePage + 1)}
                            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <svg
                                className="w-3 h-3 rtl:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
