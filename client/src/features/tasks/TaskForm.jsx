import { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function TaskForm({ initial = { title: '', description: '', status: 'open' }, onSubmit, submitLabel }) {
  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');
  const [status, setStatus] = useState(initial.status || 'open');

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title: title.trim(), description: description.trim(), status });
      }}
    >
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Finish onboarding" />
      <label className="block">
        <div className="mb-1 text-sm font-medium text-slate-700">Description</div>
        <textarea
          className="w-full min-h-28 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-400/60 placeholder:text-slate-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details"
        />
      </label>
      <label className="block">
        <div className="mb-1 text-sm font-medium text-slate-700">Status</div>
        <select
          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-400/60"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="open">Open</option>
          <option value="done">Done</option>
        </select>
      </label>
      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
