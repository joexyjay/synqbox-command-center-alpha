import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book, Circle, Link } from 'lucide-react';

const About = () => {
  const deviceInfo = {
    model: 'SynqBox PoC-2025',
    firmwareVersion: 'v1.2.3',
    serialNumber: 'SB-2025-001337',
    manufacturerDate: 'January 2025',
    lastUpdate: '2024-01-15',
  };

  const specs = [
    { label: 'Processor', value: 'ARM Cortex-M7 @ 480MHz' },
    { label: 'Memory', value: '16MB Flash, 1MB RAM' },
    { label: 'Connectivity', value: 'WiFi 6, Bluetooth 5.2' },
    { label: 'Storage', value: '128GB SSD' },
    { label: 'Power', value: '12V DC, 24W max' },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center space-x-2 mb-6">
        <Book className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">About SynqBox</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Information */}
        <Card>
          <CardHeader>
            <CardTitle>Device Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Model</span>
                <Badge variant="secondary">{deviceInfo.model}</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Firmware Version</span>
                <Badge variant="outline">{deviceInfo.firmwareVersion}</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Serial Number</span>
                <span className="text-sm text-muted-foreground font-mono">{deviceInfo.serialNumber}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Manufactured</span>
                <span className="text-sm text-muted-foreground">{deviceInfo.manufacturerDate}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Last Update</span>
                <span className="text-sm text-muted-foreground">{deviceInfo.lastUpdate}</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                Check for Updates
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {specs.map((spec, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{spec.label}</span>
                  <span className="text-sm text-muted-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* About SynqBox */}
      <Card>
        <CardHeader>
          <CardTitle>About SynqBox</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            SynqBox is a next-generation synchronization device designed for seamless data management 
            and real-time connectivity. Built with cutting-edge technology, it provides reliable, 
            high-speed data synchronization across multiple platforms and devices.
          </p>
          
          <p className="text-muted-foreground leading-relaxed">
            This PoC (Proof of Concept) model represents the latest innovations in sync technology, 
            featuring advanced algorithms for optimal performance, enhanced security protocols, 
            and an intuitive user experience that makes data management effortless.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-sm">High Performance</h3>
              <p className="text-xs text-muted-foreground mt-1">Ultra-fast sync speeds</p>
            </div>
            
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-semibold text-sm">Secure</h3>
              <p className="text-xs text-muted-foreground mt-1">Enterprise-grade security</p>
            </div>
            
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl mb-2">🌐</div>
              <h3 className="font-semibold text-sm">Connected</h3>
              <p className="text-xs text-muted-foreground mt-1">Always online, always synced</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Resources & Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Link className="w-4 h-4 mr-2" />
              User Documentation (Coming Soon)
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Link className="w-4 h-4 mr-2" />
              API Documentation (Coming Soon)
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Link className="w-4 h-4 mr-2" />
              Technical Support (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Circle className="w-4 h-4 text-primary" />
            <span className="font-semibold">SynqBox Control Center</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ and <span className="text-primary font-medium">Lovable.dev</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Designed for the future of synchronized computing
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;