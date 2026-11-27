const entries = require('./faq.json');
const { hasSensitiveInput } = require('./faq-assistant.js');
const allowed = new Set(entries.map(entry => entry.id));
const limits = new Map();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;
const MAX_BYTES = 4096;

function reply(response, status, body) {
  response.writeHead(status, {'content-type':'application/json; charset=utf-8','cache-control':'no-store'});
  response.end(JSON.stringify(body));
}

async function requestBody(request) {
  let bytes = 0;
  const chunks = [];
  for await (const chunk of request) {
    bytes += chunk.length;
    if (bytes > MAX_BYTES) return null;
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { return null; }
}

async function handleFaq(request,response) {
  if (request.method !== 'POST') return reply(response,405,{error:'method'});
  if (request.headers['sec-fetch-site'] === 'cross-site') return reply(response,403,{error:'origin'});
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers['content-type'] ?? '')) {
    return reply(response,415,{error:'content_type'});
  }
  if (Number(request.headers['content-length']) > MAX_BYTES) return reply(response,413,{error:'too_large'});
  const now = Date.now();
  for (const [key,record] of limits) if (record.until <= now) limits.delete(key);
  const ip = request.socket.remoteAddress;
  const allowance = limits.get(ip) ?? {count:0,until:now+WINDOW_MS};
  limits.set(ip,allowance);
  if (++allowance.count > MAX_REQUESTS) return reply(response,429,{error:'rate_limit'});
  const data = await requestBody(request);
  const question = typeof data?.question === 'string' ? data.question.trim() : '';
  if (!question || question.length>600 || !['en','vi'].includes(data?.language) || hasSensitiveInput(question)) {
    return reply(response,400,{error:'invalid_question'});
  }
  if (!process.env.RMIT_FAQ_AI_URL || !process.env.RMIT_FAQ_API_KEY) {
    return reply(response,503,{error:'not_configured'});
  }
  try {
    const endpoint = new URL(process.env.RMIT_FAQ_AI_URL);
    if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password) throw new Error('invalid URL');
    const result = await fetch(endpoint,{
      method:'POST', redirect:'error', signal:AbortSignal.timeout(3800),
      headers:{'content-type':'application/json',authorization:'Bearer '+process.env.RMIT_FAQ_API_KEY},
      body:JSON.stringify({question, language:data.language, candidates:entries.map(({id,question})=>({id,question}))})
    });
    if (!result.ok) throw new Error('upstream');
    const {id} = await result.json();
    return reply(response,200,{id:allowed.has(id)?id:null});
  } catch { return reply(response,502,{error:'upstream_unavailable'}); }
}
module.exports = { handleFaq };

