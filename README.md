# Vikram Saini — software & AI/LLM portfolio

A complete React 18 + Vite portfolio with a locally bundled font pair, Three.js/R3F sculpture, custom GLSL, GSAP SplitText and ScrollTrigger, Lenis, Zustand, Framer Motion, Lucide, and Tailwind CSS. No remote images, 3D models, API keys, or paid animation plugins are required.

## Run

Use Node.js 20.19+ (or 22.12+). In this folder:

```sh
npm install
npm run dev
```

The terminal prints the local URL. Build using `npm run build`; inspect the production output using `npm run preview`. Deploy the generated `dist` folder to any static host. Use HTTPS in production. Vite's development server is for local development only.

## Personalize

Profile content comes from Vikram’s supplied requirements and is centralized in `src/data/content.js`. It includes five projects, HCL internship experience, Sarlok freelance work, technical skills, college education, and activities. School education and the packages/blog section are hidden. Metrics are provided by the portfolio owner. SentinelFlow currently shows only the supplied category, technology stack and year; its detailed case study and status await confirmation. No project durations or Sarlok end date have been invented.

The theme tokens, fluid type, responsive layout and motion fallbacks live in `src/styles.css` and `tailwind.config.js`. Fonts are packaged through @fontsource and self-hosted by Vite. Hero shaders live in `src/scenes/shaders.js`.

## Contact delivery

By default the validated form opens the visitor's email app with a complete draft; it never claims to have sent an email. The email recipient is vikrmsaini12@gmail.com. The displayed phone and profile links are those supplied by Vikram.

For direct submission, copy `.env.example` to `.env.local` and set `VITE_CONTACT_ENDPOINT` to your HTTPS form service or backend. It must accept JSON `{ name, email, message, website }`, allow your site's origin through CORS, and return a successful HTTP status only after accepting the message. Validate inputs, enforce length limits, reject populated honeypots, and implement rate limits on that service. Keep secret API keys there, never in a VITE_ variable. Failed or timed-out submissions preserve the draft. Rebuild after changing environment variables.

## Interaction and accessibility

- Native dialog handles modal semantics, Escape and focus containment; focus returns to the opening card. Background scrolling is suspended while it is open.
- Work arrows and keyboard focus support the pinned desktop gallery. Touch screens and reduced-motion mode use a native horizontal scroller.
- The header motion button pauses decorative animation. The operating-system reduced-motion preference always takes precedence.
- Major GSAP effects clean up through contexts. Declarative Three.js geometries/materials dispose through R3F. Mobile uses a simpler material and lower geometry/particle counts. Rendering stops offscreen; reduced-motion scenes use demand rendering.
- The canvas is decorative and hidden from assistive technology. Its raycast hover deformation is optional; all portfolio information is regular HTML.
- Motion targets efficient transforms; actual frame rate depends on GPU, browser and screen resolution. No fixed 60fps guarantee is made.
- The contact surface uses a lightweight particle shader on desktop and static SVG turbulence on mobile or reduced-motion devices. The single-page design needs no route transitions.

## Source organization

`src/components` contains one component per section or reusable interaction. `src/scenes` contains the lazy-loaded WebGL scene and shaders. `src/hooks` handles motion and smooth scrolling. `src/lib` owns animation setup and shared state. `src/data` contains editable content. `public` holds the favicon and accessible backend-systems diagram.

GSAP SplitText usage follows https://gsap.com/docs/v3/Plugins/SplitText/ . React Three Fiber 8 is paired with React 18. Dependency licenses apply to their respective packages.

## Project screenshots

Screenshot spaces are intentionally blank. No missing image is requested. Put images in `public/projects/` and add entries such as `{ src: '/projects/unbuilt.webp', alt: 'Unbuilt project discovery screen' }` to that project’s `screenshots` array. The first image becomes the project cover; additional images appear in its detail dialog.

## Resume and project links

The requested `vikram_resume_oct(1).pdf` was not attached or found in the checked attachment and Downloads folders. The resume link is therefore unset. Add the correct PDF under `public/` and set `content.resume` to its local URL to enable the Download Resume button.

Generic GitHub profile URLs are not presented as project repositories. Supply exact URLs for Unbuilt, Distributed Spatial Indexing, and SentinelFlow to enable their repository buttons. Live-demo buttons are shown only for the supplied Unbuilt and Quadtree URLs. The contact form retains its working email-composer flow unless a submission endpoint is configured.
