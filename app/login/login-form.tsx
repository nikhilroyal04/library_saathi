'use client';

import { useEffect, useActionState } from 'react';
import { loginAction } from '@/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type LoginState = {
  error?: string;
  success?: boolean;
  redirectUrl?: string;
};

export default function LoginForm() {
  const [state, action, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    {}
  );

  // Handle redirect on success
  useEffect(() => {
    if (state?.success && state?.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state?.success, state?.redirectUrl]);

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
          <span className="text-3xl">🏛️</span>
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-bold">Welcome Back</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Login to your Library Saathi dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@librarysaathi.in"
              required
              disabled={isPending}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              disabled={isPending}
              className="w-full"
            />
          </div>

          {state?.error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              {state.error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            disabled={isPending}
          >
            {isPending ? 'Logging in...' : 'Login'}
          </Button>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">Demo Credentials:</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">Email: admin@librarysaathi.in</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">Password: admin123</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

