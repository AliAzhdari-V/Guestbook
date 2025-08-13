import Pusher from 'pusher-js';

export const createPusherClient = () => {
  return new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: '/api/pusher-auth',
    auth: {},
    disableStats: true,
  });
};