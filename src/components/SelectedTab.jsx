// SelectedTab.jsx
const SelectedTab = ({ label, href }) => {
  return (
    <li className='mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8'>
      <a className='block pb-3 text-indigo-500 whitespace-nowrap border-b-2 border-indigo-500' href={href}>
        {label}
      </a>
    </li>
  );
};

export default SelectedTab;
