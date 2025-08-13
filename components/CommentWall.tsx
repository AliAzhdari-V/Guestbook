'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition, usePusherConnection, useCommentManagement, useKeyboardShortcut } from '@/hooks';

interface CommentWallProps {
  onOnlineCountChange?: (count: number) => void;
}

const CommentWall: React.FC<CommentWallProps> = ({ onOnlineCountChange }) => {
  const mousePos = useMousePosition();
  const { onlineCount, channelRef } = usePusherConnection(onOnlineCountChange);
  const {
    bubbles,
    comments,
    text,
    name,
    setText,
    setName,
    handleSubmit,
    handleBubbleClick,
    createNewBubble,
    closeBubble,
  } = useCommentManagement(channelRef);

  // Use keyboard shortcut hook
  useKeyboardShortcut('c', () => {
    createNewBubble(mousePos.x, mousePos.y);
  }, [mousePos.x, mousePos.y]);

  return (
    <>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="fixed z-50 font-sans"
          style={{
            top: bubble.y,
            left: bubble.x,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={() => handleBubbleClick(bubble.id)}
            aria-label="Toggle comment wall"
            className="w-16 h-16 text-2xl flex items-center justify-center shadow-2xl font-sans bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full border-2 border-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            💬
          </motion.button>
          <div className="text-center mt-3 text-sm text-slate-600 font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200/50 shadow-sm">
            {onlineCount} online
          </div>

          <AnimatePresence>
            {bubble.showForm && (
              <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed w-96 max-h-[60vh] overflow-y-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 z-50 font-sans border border-slate-200/50"
                style={{
                  top: bubble.y + 60,
                  left: bubble.x,
                  transform: 'translate(-50%, 0)',
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Comment Wall</h3>
                  <button
                    onClick={() => closeBubble(bubble.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={(e) => handleSubmit(e, bubble.id, bubble.x, bubble.y)} className="mb-6">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name..."
                    className="text-black w-full mb-3 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                  />
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Leave a comment..."
                    rows={3}
                    className="text-black w-full mb-4 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white/80 backdrop-blur-sm"
                  />
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit
                    </motion.button>
                  </div>
                </form>

                <div className="space-y-3">
                  {comments
                    .filter((comment) => comment.id === bubble.id)
                    .map((comment, index) => (
                      <motion.div
                        key={`${comment.id}-${comment.createdAt}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-left p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                        style={{ 
                          backgroundColor: `${comment.color}15`,
                          borderLeft: `4px solid ${comment.color}` 
                        }}
                      >
                        <p className="text-sm font-semibold text-slate-800 mb-1">
                          {comment.name}
                        </p>
                        <p className="text-sm text-slate-700 mb-2 leading-relaxed">{comment.text}</p>
                        <p className="text-xs text-slate-500 font-medium">
                          {new Date(comment.createdAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </motion.div>
                    ))}
                  {comments.filter((comment) => comment.id === bubble.id).length === 0 && (
                    <div className="py-8">
                      <div className="text-4xl mb-3">💭</div>
                      <p className="text-slate-500 font-medium">No comments yet. Be the first to share!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </>
  );
};

export default CommentWall;