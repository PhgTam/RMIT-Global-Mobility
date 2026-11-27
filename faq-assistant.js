(() => {
  if (typeof window !== 'undefined' && window.RmitResetting) return;
  function normalize(value) {
    return value.toLowerCase().normalize('NFD').replace(/\p{M}/gu,'').replaceAll('đ','d')
      .replace(/[^a-z0-9]+/g,' ').trim();
  }

  function findTopic(question, entries) {
    const query = ' '+normalize(question)+' ';
    const intents = [
      ['travel', /\b(travel|flight|re enter|reentry|xuat canh|nhap canh|di lai|du lich)\b/],
      ['documents', /\b(what documents|which documents|required documents|document checklist|giay to gi|ho so can)\b/],
      ['contact', /\b(how (?:do|can) i contact|contact details|email address|lien he.*the nao|dia chi email)\b/]
    ];
    const explicit = intents.filter(([,pattern]) => pattern.test(query));
    if (explicit.length > 1) return null;
    if (explicit.length === 1) return entries.find(entry => entry.id === explicit[0][0]) ?? null;
    const scored = entries.map(entry => {
      const labels = Object.values(entry.question);
      if (labels.some(label => ' '+normalize(label)+' ' === query)) return {entry, score:100};
      const score = Math.max(0, ...entry.keywords.map(keyword => {
        const word = normalize(keyword);
        return query.includes(' '+word+' ') ? word.split(' ').length : 0;
      }));
      return {entry,score};
    }).sort((a,b)=>b.score-a.score);
    return scored[0]?.score && scored[0].score > (scored[1]?.score ?? 0) ? scored[0].entry : null;
  }

  function hasSensitiveInput(question) {
    return /[^\s@]+@[^\s@]+\.[^\s@]+|(?:\d[\s.\-()]*){6,}|\b[A-Z]{1,4}\d{4,}\b|\b\d{4,}[A-Z]{1,4}\b/i.test(question);
  }

  if (typeof module !== 'undefined') {
    module.exports = { findTopic, hasSensitiveInput };
    return;
  }

  const chat = document.querySelector('#chat');
  if (!chat) return;
  const open = RmitDialog.wire(chat);
  const form = chat.querySelector('form');
  const input = form.querySelector('textarea');
  const log = chat.querySelector('.chat-log');
  const intro = log.querySelector('.chat-note');
  const suggestions = chat.querySelector('.chat-suggestions');
  const validation = chat.querySelector('.chat-validation');
  const pending = chat.querySelector('.chat-typing');
  const route = document.querySelector('meta[name="rmit-faq-route"]')?.content;
  let data;
  let pendingRequest;
  let revision = 0;

  function load() {
    data ??= fetch('faq.json').then(response => {
      if (!response.ok) throw new Error('FAQ unavailable');
      return response.json();
    }).catch(error => {
      data = undefined;
      throw error;
    });
    return data;
  }

  function addBubble(className, message, label) {
    const bubble = document.createElement('p');
    bubble.className = className;
    bubble.setAttribute('aria-label',RmitText.get(label));
    bubble.textContent = message;
    pending.before(bubble);
    return bubble;
  }

  function scrollLog() { log.scrollTop = log.scrollHeight; }

  async function paintSuggestions() {
    const language = RmitText.isVietnamese() ? 'vi' : 'en';
    let entries;
    try { entries = await load(); } catch { return; }
    if ((RmitText.isVietnamese() ? 'vi' : 'en') !== language) return;
    suggestions.replaceChildren(...['documents','email','travel','review'].map(id => {
      const entry = entries.find(item=>item.id===id);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'chat-suggestion';
      button.textContent = entry.question[language];
      button.addEventListener('click', () => submit(entry.question[language],entry.id));
      return button;
    }));
  }

  async function bridge(question, language, entries, signal) {
    if (!route || route !== '/api/faq') return null;
    try {
      const response = await fetch(route,{
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({question,language}),
        signal:AbortSignal.any([signal,AbortSignal.timeout(4500)])
      });
      if (!response.ok) return null;
      const {id} = await response.json();
      return entries.find(entry=>entry.id===id) ?? null;
    } catch { return null; }
  }

  function notice(key) {
    validation.dataset.t = key;
    validation.textContent = RmitText.get(key);
    validation.hidden = false;
    input.focus();
  }

  async function submit(raw,id) {
    if (pendingRequest) return;
    const question = raw.trim();
    if (!question) { notice('faqEmpty'); return; }
    if (question.length > 600) { notice('faqLength'); return; }
    if (hasSensitiveInput(question)) { notice('faqPrivacy'); return; }
    validation.hidden = true;
    const language = RmitText.isVietnamese() ? 'vi' : 'en';
    const active = revision;
    const controller = new AbortController();
    pendingRequest = controller;
    input.value = '';
    addBubble('chat-user',question,'faqYou');
    pending.hidden = false;
    suggestions.inert = true;
    form.querySelector('button').disabled = true;
    scrollLog();
    let answer, match;
    try {
      const entries = await load();
      match = id ? entries.find(entry=>entry.id===id) : findTopic(question,entries);
      match ??= await bridge(question,language,entries,controller.signal);
      answer = match?.answer[language] ?? RmitText.get('faqFallback');
    } catch { answer = RmitText.get('faqError'); }
    if (active !== revision) return;
    pending.hidden = true;
    const reply = addBubble('chat-assistant',answer,'assistant');
    if (!match || match.id === 'contact') {
      const contact = document.querySelector('.contact-email');
      const address = contact.textContent;
      const [before, after] = answer.split(address);
      if (after !== undefined) reply.replaceChildren(before, contact.cloneNode(true), after);
    }
    if (match?.source.startsWith('renewal.html#')) {
      const link = document.createElement('a');
      link.href = match.source;
      link.textContent = language === 'vi' ? 'Xem phần hướng dẫn liên quan' : 'Open the related guide section';
      reply.append(document.createElement('br'),link);
    }
    suggestions.inert = false;
    form.querySelector('button').disabled = false;
    pendingRequest = undefined;
    scrollLog();
  }

  document.querySelector('#answer').addEventListener('click',event => {
    open(event.currentTarget,input);
    paintSuggestions();
  });
  chat.querySelector('[data-clear]').addEventListener('click',() => {
    revision++;
    pendingRequest?.abort();
    pendingRequest = undefined;
    log.replaceChildren(intro,pending);
    pending.hidden = true;
    validation.hidden = true;
    input.value = '';
    form.querySelector('button').disabled = false;
    suggestions.inert = false;
    input.focus();
  });
  form.addEventListener('submit',event => {
    event.preventDefault();
    submit(input.value);
  });
  input.addEventListener('keydown',event => {
    if(event.key==='Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
  input.addEventListener('input',() => { validation.hidden = true; });
  addEventListener('rmit-language',paintSuggestions);
})();

