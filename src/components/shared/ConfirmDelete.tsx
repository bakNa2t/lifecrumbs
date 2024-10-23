import { Button } from "../ui/button";

type ConfirmDeleteProps = {
  handleCancelDelete: () => void;
  handleDeletePost: () => void;
};

const ConfirmDelete = ({
  handleCancelDelete,
  handleDeletePost,
}: ConfirmDeleteProps) => {
  return (
    <div className="fixed inset-0 bg-dark-1 bg-opacity-75 transition-opacity flex flex-col items-center justify-center z-100">
      <div className="inline-block align-bottom bg-dark-4 rounded-lg text-left overflow-hidden shadow-lg shadow-primary-500/60 sm:shadow-xl sm:shadow-primary-500/60 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-dark-2 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
              <h3 className="text-lg leading-6 font-medium text-light-3">
                Delete Post?
              </h3>
              <div className="mt-2">
                <p className="text-sm text-light-4">
                  Are you sure you want to delete this post?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark-3 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:gap-2">
          <Button
            type="button"
            className="shad-button_primary w-full sm:w-auto mb-3 sm:mb-0 active:translate-y-[-2px] hover:shadow-lg hover:shadow-light-3"
            onClick={handleDeletePost}
          >
            Confirm
          </Button>

          <Button
            type="button"
            className="shad-button_dark_4 w-full sm:w-auto active:translate-y-[-2px] hover:shadow-lg hover:shadow-light-3"
            onClick={handleCancelDelete}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
