# RMIT Global Mobility

A bilingual, dependency-free static website. Home leads to a five-section Renewal journey and a bilingual Contact interface.

## Start locally

Run this command from the project directory with Node.js installed.

```powershell
node serve.cjs
```

Open [http://127.0.0.1:4177](http://127.0.0.1:4177/). Serve the site over HTTP so the pages share language and session state and Contact can fetch `faq.json`.

## Source

- `index.html`, `renewal.html`, `contact.html` are the three pages.
- `site.css` and `site.js` provide the shared layout, navigation, and dialogs.
- `renewal.css`, `renewal.js` and `story.js` control the story layout, scrolling, envelope, folders, and trackers.
- `translations.js` holds the English and Vietnamese interface strings.
- `faq.json` stores the bilingual FAQ. `faq-assistant.js` retrieves answers from that file.
- `assets/` contains the section illustrations and logo artwork. See [ASSET_MANIFEST.md](ASSET_MANIFEST.md) for the reference mapping.

The local FAQ works without an API key and can run on a static host. It answers from the project’s Renewal guide, links to the relevant section where available, and directs unresolved questions to [mobility@rmit.edu.vn](mailto:mobility@rmit.edu.vn).

## Optional AI topic matching

1. Provide a private HTTPS classifier that accepts `POST { question, language, candidates }` and returns `{ "id": "<candidate ID or null>" }`. Use an approved service configured to select a topic ID. Displayed answers always come from the local FAQ.
2. In an environment file held outside the website root, set `RMIT_FAQ_AI_URL` and `RMIT_FAQ_API_KEY` using `.env.example` as the template. Run `node --env-file=<private-file> serve.cjs` from the project. The credential is sent server-side as a Bearer token.
3. Change the `rmit-faq-route` meta tag in `contact.html` to `content="/api/faq"`. The frontend sends only locally unmatched questions to the configured server. The server validates input, rate-limits requests, rejects common identifier patterns, times out unavailable upstreams, and accepts only known FAQ IDs.
4. For static hosting, publish the local FAQ normally. Optional classifier use requires a same-origin Node or serverless handler for `/api/faq` with its own private credentials and deployment-level rate limiting.

The optional classifier requires real configuration and provider integration testing. Repatriation is marked Coming soon.

The renewal date, forms, and application states are illustrative examples.

