'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CommentWall from '@/components/CommentWall';

const Home: React.FC = () => {
  const [onlineCount, setOnlineCount] = useState<number>(0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative px-6 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Main heading with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
              Guestbook Project
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Enhanced description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
            className="mb-12"
          >
            <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed max-w-2xl mx-auto">
              Welcome to our interactive guestbook! Leave your mark and connect with others in this collaborative space.
            </p>
            
            {/* Interactive instruction with better styling */}
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl px-6 py-4 shadow-lg">
              <span className="text-slate-600 font-medium">Press</span>
              <kbd className="font-mono bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300 px-3 py-2 rounded-lg text-slate-700 font-semibold shadow-sm">
                c
              </kbd>
              <span className="text-slate-600 font-medium">to open the guestbook</span>
            </div>
          </motion.div>

          {/* Online users counter with enhanced design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-700 font-semibold">
                {onlineCount} {onlineCount === 1 ? 'person' : 'people'} online
              </span>
            </div>
          </motion.div>

          {/* Comment wall container with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
            className="relative"
          >
            <CommentWall onOnlineCountChange={setOnlineCount} />
          </motion.div>

          {/* Footer with additional info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-slate-500 text-sm">
              Built with Next.js, Framer Motion, and real-time collaboration
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default Home;