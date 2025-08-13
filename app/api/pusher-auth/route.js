import { pusherServer } from '@/lib/pusherServer';

export async function POST(req) {
  let socket_id = null;
  let channel_name = null;
  const ct = req.headers.get('content-type') || '';
  try {
    if (ct.includes('application/json')) {
      const body = await req.json();
      socket_id = body.socket_id;
      channel_name = body.channel_name;
    } else if (ct.includes('application/x-www-form-urlencoded') || ct.includes('form')) {
      const form = await req.formData();
      socket_id = form.get('socket_id');
      channel_name = form.get('channel_name');
    } else {
      // fallback: parse text as urlencoded
      const text = await req.text();
      const params = new URLSearchParams(text);
      socket_id = params.get('socket_id');
      channel_name = params.get('channel_name');
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'invalid body' }), { status: 400 });
  }

  if (!socket_id || !channel_name) {
    return new Response(JSON.stringify({ error: 'missing socket_id or channel_name' }), { status: 400 });
  }

  const user_id = 'user_' + Math.random().toString(36).slice(2, 8);
  const user_info = { name: `User-${user_id.slice(-4)}` };

  const auth = pusherServer.authorizeChannel(socket_id, channel_name, {
    user_id,
    user_info,
  });

  return new Response(JSON.stringify(auth), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}