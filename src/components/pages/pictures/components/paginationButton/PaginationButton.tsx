import { FC } from "react";

interface PaginationButtonProps {
  isNextPagination: boolean;
  isLoading: boolean;
  handlePagination: () => void;
}

const PaginationButton: FC<PaginationButtonProps> = ({
  handlePagination,
  isLoading,
  isNextPagination,
}) => {
  return isNextPagination ? (
    <button
      disabled={isLoading}
      onClick={handlePagination}
      className="py-3 px-6 rounded shadow-sm bg-purple-300 hover:bg-purple-400 disabled:bg-purple-200 disabled:cursor-not-allowed text-white w-fit mx-auto"
    >
      Завантажити ще
    </button>
  ) : (
    <p
      role="alert"
      className="sticky bottom-2 w-fit mx-auto bg-purple-600/70 text-white shadow py-1 px-3 rounded-lg text-center"
    >
      Нажаль фото з обраними катигоріями закінчились спробуйте щось інше
    </p>
  );
};

export default PaginationButton;
