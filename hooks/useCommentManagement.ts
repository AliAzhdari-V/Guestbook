import { useState, useEffect, RefObject } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Comment {
  id: string;
  text: string;
  name: string;
  color: string;
  createdAt: string;
  x: number;
  y: number;
}

interface Bubble {
  id: string;
  x: number;
  y: number;
  showForm: boolean;
}

interface PusherMembers {
  count: number;
  me?: unknown;
}

export const useCommentManagement = (channelRef: RefObject<Pusher.PresenceChannel<PusherMembers> | null>) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState<string>('');
  const [name, setName] = useState<string>('');

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    if (!channelRef.current) return;

    channelRef.current.bind('new-comment', (data: Comment) => {
      setComments((prev) => {
        if (prev.some((comment) => comment.id === data.id && comment.createdAt === data.createdAt)) {
          return prev;
        }
        const newComments = [...prev, data];
        return newComments;
      });

      setBubbles((prev) => {
        if (prev.some((bubble) => bubble.id === data.id)) {
          return prev.map((bubble) =>
            bubble.id === data.id ? { ...bubble, showForm: false } : bubble
          );
        }
        const newBubble = { id: data.id, x: data.x, y: data.y, showForm: false };
        return [...prev, newBubble];
      });
    });
  }, [channelRef]);

  const handleSubmit = async (e: React.FormEvent, bubbleId: string, x: number, y: number) => {
    e.preventDefault();
    if (!text.trim() || !name.trim()) return;

    const newComment: Comment = {
      id: bubbleId,
      text: text.trim(),
      name: name.trim(),
      color: generateRandomColor(),
      createdAt: new Date().toISOString(),
      x,
      y,
    };

    try {
      const response = await fetch('/api/send-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit comment: ${response.statusText}`);
      }
      setText('');
      setName('');
      setBubbles((prev) =>
        prev.map((bubble) =>
          bubble.id === bubbleId ? { ...bubble, showForm: false } : bubble
        )
      );
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  const handleBubbleClick = (bubbleId: string) => {
    console.log('Bubble clicked:', bubbleId);
    setBubbles((prev) =>
      prev.map((bubble) =>
        bubble.id === bubbleId ? { ...bubble, showForm: true } : bubble
      )
    );
  };

  const createNewBubble = (x: number, y: number) => {
    const id = uuidv4();
    const newBubble = { id, x, y, showForm: true };
    setBubbles((prev) => [...prev, newBubble]);
  };

  const closeBubble = (bubbleId: string) => {
    setBubbles((prev) =>
      prev.map((b) =>
        b.id === bubbleId ? { ...b, showForm: false } : b
      )
    );
  };

  return {
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
  };
};
