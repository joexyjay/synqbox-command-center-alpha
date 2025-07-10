# SynqBox API Integration Guide

This document provides detailed instructions for integrating the SynqBox Control Center with the actual SynqBox device API.

## Current Architecture

The application currently uses mock data simulation through the `useRealTimeData` hook. All UI components and pages are already built and functional - only the data layer needs to be swapped out.

## Integration Steps

### Phase 1: API Service Layer

Create a new API service to handle all SynqBox communications:

```typescript
// src/services/synqboxApi.ts
export class SynqBoxAPI {
  private wsConnection: WebSocket | null = null;
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  // WebSocket connection for real-time data
  connectWebSocket(onMessage: (data: any) => void) {
    // Implementation for WebSocket connection
  }

  // HTTP methods for device control
  async startSync(): Promise<void> {}
  async stopSync(): Promise<void> {}
  async rebootDevice(): Promise<void> {}
  async updateNetworkConfig(config: NetworkConfig): Promise<void> {}
  async getLogs(filters?: LogFilters): Promise<LogEntry[]> {}
}
```

### Phase 2: Replace Mock Data Hook

Update the `useRealTimeData` hook to use real API:

```typescript
// src/hooks/useRealTimeData.tsx
export const useRealTimeData = () => {
  const [data, setData] = useState<RealTimeData>(initialState);
  const api = useMemo(() => new SynqBoxAPI(API_URL, API_KEY), []);

  useEffect(() => {
    // Replace mock intervals with WebSocket connection
    api.connectWebSocket((wsData) => {
      // Map API response to current data structure
      setData(mapApiDataToState(wsData));
    });

    return () => api.disconnect();
  }, [api]);

  const simulateSync = useCallback(async () => {
    // Replace with actual API call
    await api.startSync();
  }, [api]);

  return { data, simulateSync: simulateSync };
};
```

### Phase 3: Controls Integration

Wire up the Controls page to actual API calls:

```typescript
// src/pages/Controls.tsx
const handleNetworkSubmit = async (formData: NetworkConfig) => {
  setIsLoading(true);
  try {
    await api.updateNetworkConfig(formData);
    toast({
      title: "Network Updated",
      description: "Configuration saved successfully"
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to update network configuration",
      variant: "destructive"
    });
  } finally {
    setIsLoading(false);
  }
};
```

### Phase 4: Live Logs Implementation

Replace mock logs with real streaming:

```typescript
// src/pages/Logs.tsx
useEffect(() => {
  const logStream = api.connectLogStream((logEntry) => {
    setLogs(prev => [logEntry, ...prev.slice(0, 999)]); // Keep last 1000
  });

  return () => logStream.disconnect();
}, [api]);
```

## Data Mapping

### API Response to Dashboard Data

Map incoming API data to the current dashboard structure:

```typescript
function mapApiDataToState(apiResponse: SynqBoxApiResponse): RealTimeData {
  return {
    synqLevel: apiResponse.sync_progress_percent,
    syncSpeed: `${apiResponse.current_speed_mbps.toFixed(1)} MB/s`,
    lastSync: formatTimestamp(apiResponse.last_sync_timestamp),
    isOnline: apiResponse.connection_status === 'connected',
    isSyncing: apiResponse.sync_status === 'active',
    health: mapHealthStatus(apiResponse.system_health),
    uptime: formatUptime(apiResponse.uptime_seconds),
    networkStrength: apiResponse.wifi_signal_dbm
  };
}
```

### Log Entry Mapping

```typescript
function mapApiLogToLogEntry(apiLog: SynqBoxLog): LogEntry {
  return {
    id: apiLog.id,
    timestamp: new Date(apiLog.timestamp),
    level: mapLogLevel(apiLog.severity),
    message: apiLog.message,
    category: apiLog.component || 'system'
  };
}
```

## Error Handling

Implement comprehensive error handling:

```typescript
// Connection error states
const [connectionState, setConnectionState] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');

// Error boundaries for component failures
// Retry logic for failed API calls
// Fallback to cached data when offline
```

## Environment Configuration

Set up environment variables:

```env
# .env
VITE_SYNQBOX_API_URL=http://192.168.1.100:8080
VITE_SYNQBOX_WS_URL=ws://192.168.1.100:8080/ws
VITE_API_KEY=your-device-api-key
VITE_ENABLE_MOCK_DATA=false
```

## Testing Strategy

1. **Mock Data Toggle**: Keep mock data available for development
2. **API Mocking**: Use MSW for API testing
3. **Error Scenarios**: Test connection failures, timeouts, invalid data
4. **Performance**: Monitor WebSocket connection stability

## Security Considerations

- API key storage and rotation
- HTTPS/WSS for production
- Input validation on all form submissions
- Rate limiting for API calls

## Migration Checklist

- [ ] Create API service class
- [ ] Replace useRealTimeData hook
- [ ] Wire up Controls page actions
- [ ] Implement live log streaming
- [ ] Add error handling and loading states
- [ ] Set up environment configuration
- [ ] Test all user interactions
- [ ] Verify responsive design still works
- [ ] Test theme switching functionality
- [ ] Document any API-specific configuration

## Rollback Plan

If issues arise during integration:

1. Set `VITE_ENABLE_MOCK_DATA=true` to revert to mock data
2. The entire UI layer remains unchanged
3. Fix API integration issues without affecting user experience

---

**Note**: The current mock implementation provides a solid foundation. The UI/UX is complete and polished - only the data layer needs replacement for production use.