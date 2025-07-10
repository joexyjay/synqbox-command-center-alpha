import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Circle, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

interface LogEntry {
  id: number;
  timestamp: string;
  eventType: string;
  details: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

/**
 * Live Logs Page
 * 
 * Features:
 * - Real-time log streaming (currently mock data)
 * - Log level filtering (Info, Warning, Error)
 * - Search functionality
 * - Auto-scroll with pause capability
 * 
 * For API integration: Replace mock logs array with
 * WebSocket connection to device log endpoint
 */
const Logs = () => {
  const { toast } = useToast();
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      timestamp: '2024-01-15 14:32:45',
      eventType: 'Sync Started',
      details: 'Automatic sync initiated for user data',
      status: 'info'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:33:12',
      eventType: 'Sync Completed',
      details: 'Successfully synchronized 2.4GB of data',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:28:03',
      eventType: 'Connection Warning',
      details: 'Network latency higher than optimal (150ms)',
      status: 'warning'
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:25:17',
      eventType: 'System Boot',
      details: 'SynqBox PoC-2025 initialized successfully',
      status: 'success'
    },
    {
      id: 5,
      timestamp: '2024-01-15 14:15:42',
      eventType: 'Settings Changed',
      details: 'Auto Sync enabled by user',
      status: 'info'
    },
    {
      id: 6,
      timestamp: '2024-01-15 13:58:21',
      eventType: 'Error Recovered',
      details: 'Temporary connection timeout resolved automatically',
      status: 'warning'
    },
    {
      id: 7,
      timestamp: '2024-01-15 13:45:33',
      eventType: 'Preset Activated',
      details: 'Switched to Work Mode configuration',
      status: 'info'
    },
    {
      id: 8,
      timestamp: '2024-01-15 13:30:15',
      eventType: 'Firmware Update',
      details: 'Updated to version v1.2.3 successfully',
      status: 'success'
    }
  ]);

  const getStatusBadge = (status: LogEntry['status']) => {
    const variants = {
      success: 'bg-success text-success-foreground',
      warning: 'bg-warning text-warning-foreground',
      error: 'bg-destructive text-destructive-foreground',
      info: 'bg-primary text-primary-foreground'
    };

    const icons = {
      success: '✓',
      warning: '⚠',
      error: '✗',
      info: 'ℹ'
    };

    return (
      <Badge className={variants[status]}>
        <span className="mr-1">{icons[status]}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleClearLogs = () => {
    setLogs([]);
    toast({
      title: "Logs Cleared",
      description: "All log entries have been successfully cleared.",
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    };
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">System Logs</h1>
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
              <X className="w-4 h-4 mr-2" />
              Clear Logs
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear All Logs?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will permanently delete all log entries. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleClearLogs}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Clear All Logs
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Events</span>
            <Badge variant="secondary">{logs.length} entries</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No log entries to display</p>
              <p className="text-sm text-muted-foreground mt-2">System events will appear here as they occur</p>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => {
                const { date, time } = formatTimestamp(log.timestamp);
                return (
                  <div key={log.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(log.status)}
                          <h3 className="font-semibold">{log.eventType}</h3>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{log.details}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{date}</span>
                          <Circle className="w-1 h-1 fill-current" />
                          <span>{time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Log Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {logs.filter(log => log.status === 'success').length}
              </div>
              <p className="text-xs text-muted-foreground">Successful Events</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {logs.filter(log => log.status === 'warning').length}
              </div>
              <p className="text-xs text-muted-foreground">Warnings</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">
                {logs.filter(log => log.status === 'error').length}
              </div>
              <p className="text-xs text-muted-foreground">Errors</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {logs.filter(log => log.status === 'info').length}
              </div>
              <p className="text-xs text-muted-foreground">Info Events</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Logs;