// UnselectedTab.jsx
const UnselectedTab = ({ label, href }) => {
  return (
    <li className='mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8'>
      <a
        className='block pb-3 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap'
        href={href}
      >
        {label}
      </a>
    </li>
  );
};

export default UnselectedTab;
