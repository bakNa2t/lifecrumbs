const ConfirmDelete = () => {
  return (
    <div
      className="fixed inset-0 bg-dark-1 bg-opacity-75 transition-opacity flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      <div className="inline-block align-bottom bg-dark-4 rounded-lg text-left overflow-hidden shadow-xl shadow-white/60 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        {/* <div className="inline-block align-bottom bg-dark-4 rounded-lg text-left overflow-hidden shadow-xl shadow-white/60 transform translate-y-1/2 translate-x-1/2 transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"> */}
        {/* <div className="inline-block align-bottom bg-dark-4 rounded-lg text-left overflow-hidden shadow-xl shadow-white/60 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"> */}
        <div className="bg-dark-4 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Delete Post?
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-300">
                  Are you sure you want to delete this post?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            //   onClick={handleConfirmDelete}
          >
            Confirm
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            //   onClick={handleCancelDelete}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
