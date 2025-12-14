import { Button } from '../../components/Button';

export function TasksList({ items, onToggleStatus, onEdit, onDelete }) {
  if (!items?.length) {
    return <div className="text-sm text-slate-600">No tasks found.</div>;
  }

  return (
    <div className="grid gap-3">
      {items.map((t) => (
        <div
          key={t._id}
          className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/5 ring-1 ring-black/[0.03] transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md hover:shadow-slate-900/10"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                    t.status === 'done'
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                      : 'bg-amber-50 text-amber-700 ring-amber-200'
                  }`}
                >
                  {t.status === 'done' ? 'Done' : 'Open'}
                </span>
                <div className="font-semibold text-slate-900 truncate">{t.title}</div>
              </div>
              {t.description ? <div className="mt-1 text-sm text-slate-600">{t.description}</div> : null}
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              <Button variant="secondary" onClick={() => onToggleStatus(t)}>
                {t.status === 'done' ? 'Reopen' : 'Done'}
              </Button>
              <Button variant="secondary" onClick={() => onEdit(t)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(t)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
