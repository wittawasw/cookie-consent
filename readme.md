# Cookie Consent (Banner)

## Preparing Dev Environment
Install `nodejs` and run `npm install`

## Build

Use `npm run build` to build related script files and use it in `index.html` to
demo.

## Development

- `node serve.mjs` or `npm run dev` to run dev server.
- dev server will serve `index.html` at the root with watcher on `/src` directory.

## Usage

### Installation

Build and include script in the bottom of `<body>` with `<script>`
```
<script type="text/javascript" src="./cookieConsent.js"></script>
```

### Usage

- Add addtional scripts and modify existing scripts in `src/js/scripts` directory and import its exported functions to `executeScripts` function in `src/js/scrips.js`
- Use `hasCookieConsent()` to determine if script should be executed in oher
places

```javascript
//example

if (hasCookieConsent()) {
  gtag('event', 'event_name', {
    'key': 'value',
  });
}
```

### Environment Variables
- add custom options in `.env`.

```shell
GTAG=G-EXAMPLE_TAG #specified G tag for Google Analytics
PRIVACY_POLICY_URL="example.com/privacy.html" #specified privacy policy link
PORT=3000 # development port
```
