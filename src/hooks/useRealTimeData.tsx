import { useState, useEffect, useCallback } from 'react';

interface RealTimeData {
  synqLevel: number;
  syncSpeed: string;
  lastSync: string;
  isOnline: boolean;
  isSyncing: boolean;
  health: string;
  uptime: string;
  networkStrength: number;
}

export const useRealTimeData = () => {
  const [data, setData] = useState<RealTimeData>({
    synqLevel: 73,
    syncSpeed: '42.7 MB/s',
    lastSync: '3 minutes ago',
    isOnline: true,
    isSyncing: false,
    health: 'All systems nominal',
    uptime: '7 days, 14 hours',
    networkStrength: -42
  });

  const [lastSyncMinutes, setLastSyncMinutes] = useState(3);

  const generateRandomData = useCallback(() => {
    setData(prev => {
      const newSynqLevel = Math.max(60, Math.min(95, prev.synqLevel + (Math.random() - 0.5) * 4));
      const baseSpeed = 35 + Math.random() * 25;
      const newSyncSpeed = `${baseSpeed.toFixed(1)} MB/s`;
      const isCurrentlySyncing = Math.random() > 0.7;
      
      // Occasionally go offline for realism
      const newIsOnline = Math.random() > 0.05;
      
      const networkVariation = (Math.random() - 0.5) * 10;
      const newNetworkStrength = Math.max(-70, Math.min(-30, prev.networkStrength + networkVariation));
      
      const healthMessages = [
        'All systems nominal',
        'Operating optimally',
        'Performance excellent',
        'Systems running smoothly'
      ];
      
      return {
        ...prev,
        synqLevel: Math.round(newSynqLevel * 10) / 10,
        syncSpeed: newSyncSpeed,
        isSyncing: isCurrentlySyncing,
        isOnline: newIsOnline,
        health: healthMessages[Math.floor(Math.random() * healthMessages.length)],
        networkStrength: Math.round(newNetworkStrength)
      };
    });
  }, []);

  const updateLastSync = useCallback(() => {
    setLastSyncMinutes(prev => {
      const newMinutes = prev + 1;
      setData(prevData => ({
        ...prevData,
        lastSync: newMinutes === 1 ? '1 minute ago' : `${newMinutes} minutes ago`
      }));
      return newMinutes;
    });
  }, []);

  const simulateSync = useCallback(() => {
    setData(prev => ({ ...prev, isSyncing: true }));
    setTimeout(() => {
      setData(prev => ({ ...prev, isSyncing: false }));
      setLastSyncMinutes(0);
      setData(prev => ({ ...prev, lastSync: 'Just now' }));
    }, 3000);
  }, []);

  useEffect(() => {
    // Update data every 2-4 seconds
    const dataInterval = setInterval(() => {
      generateRandomData();
    }, 2000 + Math.random() * 2000);

    // Update last sync time every minute
    const syncTimeInterval = setInterval(() => {
      updateLastSync();
    }, 60000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(syncTimeInterval);
    };
  }, [generateRandomData, updateLastSync]);

  return { data, simulateSync };
};