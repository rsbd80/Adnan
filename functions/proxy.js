// functions/proxy.js
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const target = url.searchParams.get('url');
  if (!target) return new Response('No url', { status: 400 });

  try {
    const res = await fetch(target, {
      headers: {
        'Referer': 'https://aiv-cdn.net/',
        'Origin': 'https://aiv-cdn.net',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
      }
    });

    const headers = new Headers(res.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Headers', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    // MPD ভিতরের Relative URL গুলা ঠিক রাখার জন্য
    return new Response(res.body, { status: res.status, headers });
  } catch (e) {
    return new Response('Proxy Error: ' + e.message, { status: 500 });
  }
}
