import { pusherServer } from '@/lib/pusherServer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, text, name, color, x, y } = body;

    if (!id || !text || !name || !color || x == null || y == null) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const comment = {
      id,
      text: text.toString().trim(),
      name: name.toString().trim(),
      color: color.toString().trim(),
      createdAt: new Date().toISOString(),
      x,
      y,
    };

    const channel = process.env.NEXT_PUBLIC_PUSHER_CHANNEL || 'presence-wall';
    await pusherServer.trigger(channel, 'new-comment', comment);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}