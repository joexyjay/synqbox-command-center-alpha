import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Settings, Volume1, Circle, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * Device Controls Page
 * 
 * Provides interface for:
 * - Network configuration (WiFi settings)
 * - Sync management (presets, manual control)
 * - System settings (advanced configuration)
 * 
 * Ready for API integration - form handlers just need
 * to call actual SynqBox API endpoints instead of showing toasts
 */
const Controls = () => {
  const { toast } = useToast();
  const [autoSync, setAutoSync] = useState(true);
  const [powerSave, setPowerSave] = useState(false);
  const [volume, setVolume] = useState([65]);
  const [brightness, setBrightness] = useState([80]);
  const [wifiSSID, setWifiSSID] = useState('SynqBox-Network');
  const [wifiPassword, setWifiPassword] = useState('');
  
  const [presets] = useState([
    { id: 1, name: 'Gaming Mode', description: 'High performance, low latency', active: false },
    { id: 2, name: 'Work Mode', description: 'Balanced performance and efficiency', active: true },
    { id: 3, name: 'Sleep Mode', description: 'Minimal power consumption', active: false },
  ]);

  const handleSaveNetwork = () => {
    toast({
      title: "Network Settings Saved",
      description: "WiFi configuration has been updated successfully.",
    });
  };

  const handleActivatePreset = (presetName: string) => {
    toast({
      title: "Preset Activated",
      description: `Switched to ${presetName}`,
    });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Device Controls</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Device Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-sync" className="text-sm font-medium">Auto Sync</Label>
                <p className="text-xs text-muted-foreground">Automatically sync data when available</p>
              </div>
              <Switch
                id="auto-sync"
                checked={autoSync}
                onCheckedChange={setAutoSync}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="power-save" className="text-sm font-medium">Power Save Mode</Label>
                <p className="text-xs text-muted-foreground">Reduce power consumption</p>
              </div>
              <Switch
                id="power-save"
                checked={powerSave}
                onCheckedChange={setPowerSave}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Audio Output Volume</Label>
                <span className="text-sm text-muted-foreground">{volume[0]}%</span>
              </div>
              <div className="flex items-center space-x-3">
                <Volume1 className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Indicator Light Brightness</Label>
                <span className="text-sm text-muted-foreground">{brightness[0]}%</span>
              </div>
              <div className="flex items-center space-x-3">
                <Circle className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Network Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wifi-ssid">WiFi SSID</Label>
              <Input
                id="wifi-ssid"
                value={wifiSSID}
                onChange={(e) => setWifiSSID(e.target.value)}
                placeholder="Enter network name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wifi-password">WiFi Password</Label>
              <Input
                id="wifi-password"
                type="password"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            <Button onClick={handleSaveNetwork} className="w-full">
              Save Network Settings
            </Button>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Connection Status</span>
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  Connected
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Signal strength: Excellent (-42 dBm)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Synq Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Synq Presets</CardTitle>
          <p className="text-sm text-muted-foreground">
            Pre-configured operational modes for different use cases
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {presets.map((preset) => (
              <Card key={preset.id} className={`transition-all duration-300 ${preset.active ? 'border-primary shadow-glow-primary' : 'hover:border-accent'}`}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{preset.name}</h3>
                      {preset.active && (
                        <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{preset.description}</p>
                    
                    <Button
                      size="sm"
                      variant={preset.active ? "secondary" : "outline"}
                      onClick={() => handleActivatePreset(preset.name)}
                      disabled={preset.active}
                      className="w-full"
                    >
                      <Play className="w-3 h-3 mr-2" />
                      {preset.active ? 'Currently Active' : 'Activate'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Controls;