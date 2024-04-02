export default function Link({ href, children, disabled = false }) {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault(); // Prevent link navigation
    }
    // Additional click handling if necessary
  };

  const linkClasses = `font-semibold underline decoration-dotted underline-offset-2 transition-colors duration-200 ease-in-out ${
    disabled
      ? 'text-gray-400 cursor-not-allowed hover:text-gray-400'
      : 'text-indigo-600 hover:text-indigo-800 hover:decoration-solid'
  }`;

  return (
    <a
      className={linkClasses}
      href={href}
      onClick={handleClick}
      aria-disabled={disabled} // Accessibility improvement
      tabIndex={disabled ? -1 : 0} // Improve accessibility
    >
      {children}
    </a>
  );
}
