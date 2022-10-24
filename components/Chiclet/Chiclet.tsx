export const Chiclet = ({ text, color }) => {
  const classes = [
    'mr-1',
    'mb-1',
    'inline-block',
    'rounded-sm',
    'border',
    'py-1',
    'px-2',
    'text-xs',
    'font-semibold',
    'last:mr-0',
    // temp literals do not work with tailwind without more config.
    ...(color === 'red' ? ['border-red-200', 'bg-red-100', 'text-red-400'] : []),
    ...(color === 'yellow'
      ? ['border-yellow-200', 'bg-yellow-100', 'text-yellow-400']
      : []),
    ...(color === 'blue' ? ['border-blue-200', 'bg-blue-100', 'text-blue-400'] : []),
    ...(color === 'orange'
      ? ['border-orange-200', 'bg-orange-100', 'text-orange-400']
      : []),
    ...(color === 'pink' ? ['border-pink-200', 'bg-pink-100', 'text-pink-400'] : []),
    ...(color === 'violet'
      ? ['border-violet-200', 'bg-violet-100', 'text-violet-400']
      : []),
    ...(color === 'rose' ? ['border-rose-200', 'bg-rose-100', 'text-rose-400'] : []),
    ...(color === 'slate' ? ['border-slate-200', 'bg-slate-100', 'text-slate-400'] : [])
  ].join(' ');

  return <div className={classes}>{text}</div>;
};
