

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

