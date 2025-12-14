export function Card({ className = '', children }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/60 p-6 lg:p-8 shadow-sm shadow-slate-900/5 ring-1 ring-black/[0.03] transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-900/10 ${className}`}
    >
      {children}
    </div>
  );
}
