export default function ChevronUp({ onClick }) {
  return (
    <svg
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      xmlns='http://www.w3.org/2000/svg'
      class='icon icon-tabler icon-tabler-chevron-up'
      width='28'
      height='28'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='#000000'
      fill='none'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M6 15l6 -6l6 6' />
    </svg>
  );
}
