export function Button({
  className = '',
  variant = 'primary',
  type = 'button',
  disabled,
  children,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]';

  const styles = {
    primary:
      'bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-sm shadow-slate-900/20 hover:shadow-md hover:shadow-slate-900/25 hover:brightness-110',
    secondary:
      'bg-white text-slate-900 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300',
    danger:
      'bg-gradient-to-b from-rose-600 to-rose-700 text-white shadow-sm shadow-rose-700/20 hover:shadow-md hover:shadow-rose-700/25 hover:brightness-110'
  };

  return (
    <button
      type={type}
      className={`${base} ${styles[variant] || styles.primary} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
