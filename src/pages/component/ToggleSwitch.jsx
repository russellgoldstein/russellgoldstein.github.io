export const ToggleSwitch = ({ isOn, handleToggle, leftText, rightText }) => {
  return (
    <div className='flex items-center'>
      <div className='text-med text-slate-700 dark:text-slate-700 ml-2 mr-2'>{leftText}</div>
      <div className='form-switch'>
        <input type='checkbox' id='switch-1' className='sr-only' checked={isOn} onChange={() => handleToggle()} />
        <label className='bg-slate-400 dark:bg-slate-700' htmlFor='switch-1'>
          <span className='bg-white shadow-sm' aria-hidden='true'></span>
          <span className='sr-only'>Switch label</span>
        </label>
      </div>
      <div className='text-med text-slate-700 dark:text-slate-700 ml-2'>{rightText}</div>
    </div>
  );
};
