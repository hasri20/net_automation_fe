const Button = ({ children, onClick, className, disabled = false }) => {
  return (
    <button
      type="button"
      className={
        "flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 " +
        className
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
