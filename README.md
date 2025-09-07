# Aryan Portfolio (Vite + Tailwind + Framer Motion)

Modern portfolio split into components (no single-file giant).

## Setup
```bash
npm i
npm run dev
```

## Build
```bash
npm run build && npm run preview
```

## Tests
```bash
npm test
```

## Edit links
- Update `src/data/social.js` for your handles
- Put your resume file in `public/Aryan_Singh_Resume.pdf` (create `public/` at project root)


---

## Contact Providers

Choose one provider in `src/data/contact.js`:

### Formspree (no extra deps)
1. Create a form → copy your **Form ID** (e.g., `xyzabcd`).
2. Set in `CONTACT`:
    ```js
    mode: 'formspree',
    formspreeId: 'xyzabcd'
    ```

### EmailJS (client-only)
1. Create a Service + Template + Public Key in EmailJS.
2. Set in `CONTACT`:
    ```js
    mode: 'emailjs',
    emailjs: { serviceId: '...', templateId: '...', publicKey: '...' }
    ```
3. We've already added `@emailjs/browser` to dependencies.

After configuring, run:
```bash
npm i
npm run dev
```


Access Here : aryanportfolio19461.netlify.app
