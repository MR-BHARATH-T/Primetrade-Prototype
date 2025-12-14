import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../auth/useAuth';
import { getProfileApi, updateProfileApi } from '../profile/profileApi';
import { createTaskApi, deleteTaskApi, listTasksApi, updateTaskApi } from '../tasks/tasksApi';
import { TaskForm } from '../tasks/TaskForm';
import { TasksList } from '../tasks/TasksList';

export function DashboardPage() {
  const qc = useQueryClient();
  const { user, logout, setUser } = useAuth();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [editing, setEditing] = useState(null);
  const [profileName, setProfileName] = useState('');

  const tasksKey = useMemo(() => ['tasks', { search, status }], [search, status]);

  const profileQuery = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const data = await getProfileApi();
      return data.user;
    }
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (data) => {
      qc.setQueryData(['me'], data.user);
      setUser(data.user);
    }
  });

  const tasksQuery = useQuery({
    queryKey: tasksKey,
    queryFn: async () => {
      const data = await listTasksApi({ search, status });
      return data;
    }
  });

  const createMutation = useMutation({
    mutationFn: createTaskApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateTaskApi(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
      setEditing(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTaskApi(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  const meName = profileQuery.data?.name || user?.name || 'User';
  const meEmail = profileQuery.data?.email || user?.email || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100">
      <div className="mx-auto max-w-5xl lg:max-w-6xl px-4 py-8">
        <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-5 shadow-sm shadow-slate-900/5 ring-1 ring-black/[0.03] backdrop-blur sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Overview</div>
              <h1 className="mt-1 text-2xl font-semibold text-slate-900">Dashboard</h1>
              <p className="mt-1 text-sm text-slate-600">Welcome, {meName}.</p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="mt-6 mx-auto w-full max-w-5xl rounded-3xl border border-slate-200/70 bg-white/55 p-4 shadow-sm shadow-slate-900/5 ring-1 ring-black/[0.03] backdrop-blur sm:p-5">
          <div className="grid gap-6 justify-items-center lg:grid-cols-2 lg:justify-items-stretch">
            <Card className="w-full max-w-2xl lg:max-w-none lg:p-10">
              <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
              <div className="mt-3 text-sm text-slate-600">{meEmail}</div>

              <div className="mt-4 grid gap-3">
                <Input
                  label="Name"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder={meName}
                />

                <Button
                  variant="secondary"
                  disabled={updateProfileMutation.isPending}
                  onClick={async () => {
                    const name = profileName.trim();
                    if (!name) return;
                    await updateProfileMutation.mutateAsync({ name });
                    setProfileName('');
                  }}
                >
                  {updateProfileMutation.isPending ? 'Saving...' : 'Update name'}
                </Button>

                {updateProfileMutation.error ? (
                  <div className="text-sm text-rose-600">{updateProfileMutation.error.message}</div>
                ) : null}
              </div>
            </Card>

            <Card className="w-full max-w-2xl lg:max-w-none lg:p-10">
              <h2 className="text-lg font-semibold text-slate-900">Create Task</h2>
              <div className="mt-4">
                <TaskForm
                  submitLabel={createMutation.isPending ? 'Creating...' : 'Create'}
                  onSubmit={async (payload) => {
                    if (!payload.title) return;
                    await createMutation.mutateAsync(payload);
                  }}
                />
                {createMutation.error ? (
                  <div className="mt-3 text-sm text-rose-600">{createMutation.error.message}</div>
                ) : null}
              </div>
            </Card>

            <Card className="w-full lg:col-span-2 lg:p-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Your Tasks</h2>
                  <p className="mt-1 text-sm text-slate-600">Search and filter your tasks.</p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Input
                    label="Search"
                    placeholder="Title or description"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <label className="block">
                    <div className="mb-1 text-sm font-medium text-slate-700">Status</div>
                    <select
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-400/60"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="open">Open</option>
                      <option value="done">Done</option>
                    </select>
                  </label>
                </div>
              </div>

            <div className="mt-4">
              {tasksQuery.isLoading ? <div className="text-sm text-slate-600">Loading...</div> : null}
              {tasksQuery.error ? (
                <div className="text-sm text-rose-600">{tasksQuery.error.message}</div>
              ) : null}

              {editing ? (
                <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-slate-900">Edit task</div>
                    <Button variant="secondary" onClick={() => setEditing(null)}>
                      Cancel
                    </Button>
                  </div>
                  <div className="mt-3">
                    <TaskForm
                      initial={editing}
                      submitLabel={updateMutation.isPending ? 'Saving...' : 'Save'}
                      onSubmit={async (payload) => {
                        await updateMutation.mutateAsync({ id: editing._id, payload });
                      }}
                    />
                    {updateMutation.error ? (
                      <div className="mt-3 text-sm text-rose-600">{updateMutation.error.message}</div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <TasksList
                items={tasksQuery.data?.items}
                onToggleStatus={(t) =>
                  updateMutation.mutate({
                    id: t._id,
                    payload: { status: t.status === 'done' ? 'open' : 'done' }
                  })
                }
                onEdit={(t) => setEditing(t)}
                onDelete={(t) => deleteMutation.mutate(t._id)}
              />
            </div>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
