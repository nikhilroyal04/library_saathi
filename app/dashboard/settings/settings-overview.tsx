'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Bell, Shield, Globe } from 'lucide-react';

type SessionData = {
  email: string;
  subdomain?: string;
  isAdmin?: boolean;
  loginTime: number;
};

export default function SettingsOverview({ session }: { session: SessionData }) {
  const isSaving = false;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              defaultValue={session.email}
              disabled
              className="bg-gray-50"
            />
            <p className="text-xs text-gray-500">Email cannot be changed</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
            />
          </div>
          <Button disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-500">Receive email updates about your account</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Subdomain Alerts</Label>
              <p className="text-sm text-gray-500">Get notified when new subdomains are created</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Lead Notifications</Label>
              <p className="text-sm text-gray-500">Receive alerts for new leads</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          <Button variant="outline" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-50">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
            />
          </div>
          <Button variant="outline" disabled={isSaving}>
            {isSaving ? 'Updating...' : 'Update Password'}
          </Button>
        </CardContent>
      </Card>

      {/* Platform Settings */}
      {session.isAdmin && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Manage platform-wide settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Root Domain</Label>
              <Input
                type="text"
                defaultValue="localhost:3000"
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>Default Subdomain Settings</Label>
              <p className="text-sm text-gray-500">
                Configure default settings for new subdomains
              </p>
            </div>
            <Button variant="outline" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Platform Settings'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

