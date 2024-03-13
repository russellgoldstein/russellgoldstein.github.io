export const PrimaryButtonWithIcon = ({ onClick, children, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className={`btn bg-indigo-500 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'} text-white`}
      disabled={disabled}
      title={disabled ? 'Add 9 hitters and 1 pitcher per team' : ''}
    >
      {children}
    </button>
  );
};
