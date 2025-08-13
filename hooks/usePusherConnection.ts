import { useEffect, useRef, useState } from 'react';
import { createPusherClient } from '@/lib/pusherClient';
import Pusher from 'pusher-js';

interface PusherMembers {
  count: number;
  me?: unknown;
}

export const usePusherConnection = (onOnlineCountChange?: (count: number) => void) => {
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const pusherRef = useRef<Pusher | null>(null);
  const channelRef = useRef<Pusher.PresenceChannel<PusherMembers> | null>(null);

  useEffect(() => {
    onOnlineCountChange?.(onlineCount);
  }, [onlineCount, onOnlineCountChange]);

  useEffect(() => {
    const pusher = createPusherClient();
    pusherRef.current = pusher;

    const channelName = process.env.NEXT_PUBLIC_PUSHER_CHANNEL || 'presence-wall';
    const channel = pusher.subscribe(channelName) as unknown as Pusher.PresenceChannel<PusherMembers>;
    channelRef.current = channel;

    const bindPresenceEvents = () => {
      channel.bind('pusher:subscription_succeeded', (members: PusherMembers) => {
        setOnlineCount(members.count || 1);
      });

      channel.bind('pusher:member_added', () => {
        setOnlineCount((prev) => {
          const newCount = prev + 1;
          return newCount;
        });
      });

      channel.bind('pusher:member_removed', () => {
        setOnlineCount((prev) => {
          const newCount = Math.max(0, prev - 1);
          return newCount;
        });
      });
    };

    bindPresenceEvents();

    return () => {
      try {
        if (channelRef.current) {
          channelRef.current.unbind();
          pusher.unsubscribe(channelName);
        }
        pusher.disconnect();
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    };
  }, []);

  return {
    onlineCount,
    channelRef,
    pusherRef
  };
};
