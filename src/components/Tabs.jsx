export default function Tabs({ children }) {
  return (
    <div className='relative mb-6'>
      <div className='absolute bottom-0 w-full h-px bg-slate-200 dark:bg-slate-700' aria-hidden='true'></div>
      <ul className='relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar'>
        {children}
      </ul>
    </div>
  );
}
