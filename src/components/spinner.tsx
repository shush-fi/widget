export const Spinner = () => {
  return (
    <div className="sh-w-flex sh-w-justify-center sh-w-items-center sh-w-h-full">
      <svg
        className="sh-w-animate-spin sh-w-h-8 sh-w-w-8 sh-w-text-primary"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="sh-w-text-muted"
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <path
          className="sh-w-opacity-75"
          d="M4 12a8 8 0 018-8"
          stroke="currentColor"
          strokeWidth="3"
        ></path>
      </svg>
    </div>
  );
}
