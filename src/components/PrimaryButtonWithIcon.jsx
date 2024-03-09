export const PrimaryButtonWithIcon = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className='btn bg-indigo-500 hover:bg-indigo-600 text-white'>
      {children}
    </button>
  );
};
