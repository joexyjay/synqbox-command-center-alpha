import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Circle, Play, Power, Settings } from 'lucide-react';
import synqBoxHero from '@/assets/synqbox-hero.jpg';

const Dashboard = () => {
  const [synqLevel] = useState(73);
  const [isOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const mockData = {
    syncSpeed: '42.7 MB/s',
    lastSync: '3 minutes ago',
    health: 'All systems nominal',
    uptime: '7 days, 14 hours'
  };

  const handleStartSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 3000);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Hero Section */}
      <Card className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${synqBoxHero})` }}
        />
        <CardContent className="relative p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome to SynqBox</h2>
              <p className="text-muted-foreground">Your device is running smoothly and ready for action</p>
            </div>
            <div className="text-right">
              <Badge 
                variant={isOnline ? "default" : "destructive"} 
                className={isOnline ? "bg-success text-success-foreground animate-pulse-glow" : ""}
              >
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">Uptime: {mockData.uptime}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Synq Level */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Synq Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{synqLevel}%</div>
              <Progress value={synqLevel} className="h-2" />
              <p className="text-xs text-muted-foreground">Optimal range: 70-95%</p>
            </div>
          </CardContent>
        </Card>

        {/* Sync Speed */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{mockData.syncSpeed}</div>
              <div className="flex items-center space-x-1">
                <Circle className={`w-2 h-2 ${isSyncing ? 'text-success animate-synq-spin' : 'text-muted-foreground'}`} />
                <span className="text-xs text-muted-foreground">
                  {isSyncing ? 'Syncing...' : 'Idle'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Last Sync */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{mockData.lastSync}</div>
              <p className="text-xs text-muted-foreground">Successful data transfer</p>
            </div>
          </CardContent>
        </Card>

        {/* Health Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-success text-success-foreground">
                Healthy
              </Badge>
              <p className="text-xs text-muted-foreground">{mockData.health}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleStartSync}
              disabled={isSyncing}
              className="bg-gradient-status hover:shadow-glow-success transition-all duration-300"
            >
              <Play className="w-4 h-4 mr-2" />
              {isSyncing ? 'Syncing...' : 'Start Sync'}
            </Button>
            
            <Button variant="outline">
              <Circle className="w-4 h-4 mr-2" />
              Stop Sync
            </Button>
            
            <Button variant="outline" className="border-warning text-warning hover:bg-warning hover:text-warning-foreground">
              <Power className="w-4 h-4 mr-2" />
              Reboot SynqBox
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fun Element */}
      <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-accent">Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Your SynqBox is performing exceptionally well today! 🚀
              </p>
            </div>
            <div className="text-4xl">⚡</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;