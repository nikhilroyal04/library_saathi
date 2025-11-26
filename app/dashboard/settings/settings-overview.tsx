'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { User, Bell, Shield, Globe, Settings as SettingsIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

type SessionData = {
  email: string;
  subdomain?: string;
  isAdmin?: boolean;
  loginTime: number;
};

export default function SettingsOverview({ session }: { session: SessionData }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [subdomainAlerts, setSubdomainAlerts] = useState(true);
  const [leadNotifications, setLeadNotifications] = useState(true);

  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    // TODO: Implement profile update
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    // TODO: Implement notification preferences update
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    // TODO: Implement password update
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleSavePlatformSettings = async () => {
    setIsSaving(true);
    // TODO: Implement platform settings update
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto mb-6 -mx-4 px-4">
          <TabsList className="inline-flex w-auto gap-2 justify-start">
            <TabsTrigger value="profile" className="whitespace-nowrap">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="whitespace-nowrap">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="whitespace-nowrap">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            {session.isAdmin && (
              <TabsTrigger value="platform" className="whitespace-nowrap">
                <Globe className="w-4 h-4 mr-2" />
                Platform
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        {/* Profile Tab */}
        <TabsContent value="profile">
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
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
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
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>
                {session.subdomain && (
                  <div className="space-y-2">
                    <Label htmlFor="subdomain">Subdomain</Label>
                    <Input
                      id="subdomain"
                      name="subdomain"
                      type="text"
                      defaultValue={session.subdomain}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500">Subdomain cannot be changed</p>
                  </div>
                )}
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
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
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex-1">
                  <Label htmlFor="email-notifications" className="text-base font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Receive email updates about your account
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex-1">
                  <Label htmlFor="subdomain-alerts" className="text-base font-medium">
                    Subdomain Alerts
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Get notified when new subdomains are created
                  </p>
                </div>
                <Switch
                  id="subdomain-alerts"
                  checked={subdomainAlerts}
                  onCheckedChange={setSubdomainAlerts}
                />
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <Label htmlFor="lead-notifications" className="text-base font-medium">
                    Lead Notifications
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Receive alerts for new leads
                  </p>
                </div>
                <Switch
                  id="lead-notifications"
                  checked={leadNotifications}
                  onCheckedChange={setLeadNotifications}
                />
              </div>
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleSaveNotifications}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
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
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    name="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    name="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-gray-500">
                    Password must be at least 8 characters long
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    required
                    minLength={8}
                  />
                </div>
                <Button type="submit" variant="outline" disabled={isSaving}>
                  {isSaving ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Settings Tab (Admin Only) */}
        {session.isAdmin && (
          <TabsContent value="platform">
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
                  <Label htmlFor="root-domain">Root Domain</Label>
                  <Input
                    id="root-domain"
                    name="rootDomain"
                    type="text"
                    defaultValue="localhost:3000"
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">
                    Root domain is configured at the system level
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Default Subdomain Settings</Label>
                  <p className="text-sm text-gray-500">
                    Configure default settings for new subdomains
                  </p>
                  <div className="mt-4 space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-normal">Auto-enable website</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-normal">Send welcome email</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-normal">Enable analytics</Label>
                      <Switch />
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleSavePlatformSettings}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Platform Settings'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
