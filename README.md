# SynqBox Control Center

A modern React-based dashboard for managing SynqBox devices with real-time monitoring, configuration controls, and system management capabilities.

## 🚀 Live Demo

**URL**: https://lovable.dev/projects/6f8ca372-bcd7-4a5f-b1fd-e169ba2f5f0c

## 📋 Features

- **Real-time Dashboard**: Live metrics with animated progress indicators
- **Device Controls**: Network configuration, sync management, and system controls
- **Live Logs**: Real-time log streaming with filtering and search
- **Theme Support**: Dark/light mode with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Mock Data**: Complete simulation for development and demonstration

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **State Management**: React Hooks
- **Icons**: Lucide React

## 🏗 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Layout.tsx       # Main layout with navigation
│   ├── ThemeProvider.tsx # Theme context provider
│   └── ThemeToggle.tsx  # Light/dark mode toggle
├── pages/               # Route components
│   ├── Dashboard.tsx    # Main dashboard (Index.tsx)
│   ├── Controls.tsx     # Device configuration
│   ├── Logs.tsx         # Log viewer
│   ├── About.tsx        # System information
│   └── NotFound.tsx     # 404 page
├── hooks/               # Custom React hooks
│   ├── useRealTimeData.tsx # Mock data simulation
│   └── use-toast.ts     # Toast notifications
├── assets/              # Static assets
│   └── synqbox-hero.jpg # Hero background image
├── lib/                 # Utility functions
│   └── utils.ts         # Shared utilities
├── index.css           # Global styles + design system
└── main.tsx            # Application entry point
```

## 🎨 Design System

The project uses a comprehensive design system defined in `src/index.css`:

- **Colors**: Semantic color tokens (primary, secondary, accent, success, warning)
- **Gradients**: Custom gradient utilities (`bg-gradient-synq`, `bg-gradient-status`)
- **Animations**: Custom keyframes for smooth interactions
- **Shadows**: Glow effects for interactive elements
- **Theme**: Complete dark/light mode support

## 🔧 Development Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🔌 API Integration Guide

Currently using mock data via `useRealTimeData` hook. To integrate with real SynqBox API:

### 1. Replace Mock Data Service

```typescript
// src/services/synqboxApi.ts
export class SynqBoxAPI {
  // WebSocket connection for real-time data
  // HTTP client for device controls
  // Error handling and reconnection logic
}
```

### 2. Update Real-time Hook

```typescript
// src/hooks/useRealTimeData.tsx
// Replace mock intervals with WebSocket connection
// Map API response to current data structure
```

### 3. Connect Controls

```typescript
// src/pages/Controls.tsx
// Wire up form submissions to API calls
// Add loading states and error handling
```

### 4. Live Logs Integration

```typescript
// src/pages/Logs.tsx
// Replace mock logs with streaming endpoint
// Implement real-time filtering
```

## 📊 Data Structure

Current mock data structure for easy API mapping:

```typescript
interface RealTimeData {
  synqLevel: number;          // Sync progress (0-100)
  syncSpeed: string;          // Current speed (e.g., "42.7 MB/s")
  lastSync: string;           // Human-readable time
  isOnline: boolean;          // Connection status
  isSyncing: boolean;         // Active sync state
  health: string;             // System health message
  uptime: string;             // Device uptime
  networkStrength: number;    // Signal strength in dBm
}
```

## 🎯 Key Features for Integration

### Dashboard Components
- **Hero Section**: Device status overview
- **Metrics Grid**: Real-time statistics
- **Quick Actions**: Start/stop sync, reboot device

### Controls Page
- **Network Settings**: WiFi configuration
- **Sync Presets**: Custom sync configurations
- **Advanced Settings**: Device-specific options

### Logs Page
- **Real-time Streaming**: Live log updates
- **Filtering**: By level, timestamp, content
- **Export**: Download logs for troubleshooting

## 🚀 Deployment

### Using Lovable
1. Open [Lovable Project](https://lovable.dev/projects/6f8ca372-bcd7-4a5f-b1fd-e169ba2f5f0c)
2. Click Share → Publish

### Manual Deployment
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

## 🔐 Environment Variables

For API integration, add:

```env
VITE_SYNQBOX_API_URL=http://your-synqbox-ip:port
VITE_SYNQBOX_WS_URL=ws://your-synqbox-ip:port/ws
VITE_API_KEY=your-api-key (if required)
```

## 🤝 Contributing

1. Follow the existing code style and component patterns
2. Use semantic commit messages
3. Test on both light and dark themes
4. Ensure responsive design compatibility

## 📝 License

This project is built for SynqBox device management.

---

**Ready for API integration** - All mock data can be easily replaced with real API calls while maintaining the same user experience.