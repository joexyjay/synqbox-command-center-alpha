import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Circle, Settings, Book, FileText, Power } from 'lucide-react';

const Layout = () => {
  const [isOnline] = useState(true);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Circle },
    { path: '/controls', label: 'Controls', icon: Settings },
    { path: '/logs', label: 'Logs', icon: FileText },
    { path: '/about', label: 'About', icon: Book }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-synq flex items-center justify-center">
                  <Circle className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-synq bg-clip-text text-transparent">
                  SynqBox Control Center
                </h1>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success animate-pulse-glow' : 'bg-destructive'}`} />
                <span className={`text-sm font-medium ${isOnline ? 'text-success' : 'text-destructive'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            <Button variant="outline" size="sm">
              <Power className="w-4 h-4 mr-2" />
              Quick Reboot
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors rounded-t-lg ${
                    isActive
                      ? 'bg-background text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;