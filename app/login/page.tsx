import { Metadata } from 'next';
import LoginForm from './login-form';

export const metadata: Metadata = {
  title: 'Login | Library Saathi',
  description: 'Login to Library Saathi dashboard'
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}

