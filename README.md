# 🎉 Guestbook Project

A modern, real-time collaborative guestbook built with Next.js, featuring interactive comment walls, live user presence, and beautiful animations.

![Guestbook Project](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.0-0055FF?style=for-the-badge&logo=framer)

## ✨ Features

- **🎯 Interactive Comment Walls**: Click anywhere or press `c` to create comment bubbles
- **🌐 Real-time Collaboration**: Live updates using Pusher for instant comment sharing
- **👥 Live User Presence**: See how many people are currently online
- **🎨 Beautiful UI/UX**: Modern design with smooth animations and gradients
- **📱 Responsive Design**: Works perfectly on all devices
- **🔧 Custom Hooks**: Well-organized, reusable React hooks architecture
- **⚡ Performance Optimized**: Built with Next.js 14 and optimized rendering

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Pusher account (for real-time features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd component-lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_PUSHER_APP_KEY=your_pusher_app_key
   NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster
   NEXT_PUBLIC_PUSHER_CHANNEL=presence-wall
   PUSHER_APP_ID=your_pusher_app_id
   PUSHER_SECRET=your_pusher_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Architecture

```
component-lab/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   │   ├── pusher-auth/   # Pusher authentication
│   │   └── send-comment/  # Comment submission endpoint
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page component
├── components/             # React components
│   └── CommentWall.tsx    # Main comment wall component
├── hooks/                  # Custom React hooks
│   ├── index.ts           # Hooks export file
│   ├── useMousePosition.ts # Mouse tracking hook
│   ├── usePusherConnection.ts # Pusher connection hook
│   ├── useCommentManagement.ts # Comment state management
│   └── useKeyboardShortcut.ts # Keyboard shortcuts
├── lib/                    # Utility libraries
│   ├── pusherClient.js    # Pusher client configuration
│   └── pusherServer.js    # Pusher server configuration
└── public/                 # Static assets
```

## 🎣 Custom Hooks

The project uses a clean, modular architecture with custom hooks:

### `useMousePosition`
Tracks mouse position across the screen for bubble placement.

### `usePusherConnection`
Manages Pusher connection, presence, and real-time updates.

### `useCommentManagement`
Handles comment state, submission, and bubble interactions.

### `useKeyboardShortcut`
Generic keyboard shortcut handler with input field awareness.

## 🎨 Styling & Design

- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Custom CSS**: Blob animations and glass morphism effects
- **Responsive Design**: Mobile-first approach
- **Color Scheme**: Modern slate-blue-indigo gradient palette

## 🔧 API Endpoints

### `POST /api/send-comment`
Submits a new comment to the guestbook.

**Request Body:**
```json
{
  "id": "unique-id",
  "text": "Comment text",
  "name": "User name",
  "color": "#random-color",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "x": 100,
  "y": 200
}
```

### `POST /api/pusher-auth`
Authenticates Pusher presence channels.

## 🎮 How to Use

1. **Open the guestbook** at [http://localhost:3000](http://localhost:3000)
2. **Press `c` key** or **click anywhere** to create a comment bubble
3. **Fill in your name** and comment
4. **Submit** to share with others
5. **See real-time updates** as others add comments
6. **View online users** count in real-time


### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Structure

- **Components**: Reusable UI components
- **Hooks**: Custom React hooks for logic separation
- **API Routes**: Server-side endpoints
- **Types**: TypeScript interfaces and types
- **Styles**: Tailwind CSS with custom animations


##  Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Pusher](https://pusher.com/) - Real-time infrastructure
- [TypeScript](https://www.typescriptlang.org/) - Type safety


## .env
PUSHER_APP_ID="2035971"
PUSHER_KEY="a4ed61a29becbe02c442"
PUSHER_SECRET="ed634c9f8a9fa0d50cf7"
PUSHER_CLUSTER="ap2"

NEXT_PUBLIC_PUSHER_KEY="a4ed61a29becbe02c442"
NEXT_PUBLIC_PUSHER_CLUSTER="ap2"