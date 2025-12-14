import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { registerSchema } from '../../lib/validators';
import { registerApi } from './authApi';
import { useAuth } from './useAuth';

export function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' }
  });

  async function onSubmit(values) {
    try {
      const data = await registerApi(values);
      setUser(data.user);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('root', { message: err.message || 'Registration failed' });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-md lg:max-w-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">Primetrade</div>
            <div className="text-xs text-slate-600">Create your account</div>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-slate-900 shadow-sm shadow-indigo-900/20" />
        </div>
        <div className="rounded-3xl bg-white/60 p-2 shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/70 backdrop-blur">
          <Card className="bg-white/80">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-slate-900">Create account</h1>
              <p className="mt-1 text-sm text-slate-600">Get started in a minute.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Input label="Name" placeholder="Your name" error={errors.name?.message} {...register('name')} />
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email')}
              />
              <Input
                label="Password"
                type="password"
                placeholder="At least 8 characters"
                error={errors.password?.message}
                {...register('password')}
              />

              {errors.root?.message ? (
                <div className="text-sm text-rose-600">{errors.root.message}</div>
              ) : null}

              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Register'}
              </Button>
            </form>

            <div className="mt-6 text-sm text-slate-600">
              Already have an account?{' '}
              <Link className="text-slate-900 font-medium hover:underline" to="/login">
                Login
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
