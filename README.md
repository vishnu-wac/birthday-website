# Birthday Website 🎂❤️

An interactive React birthday website — funny → cute → nostalgic → emotional → romantic → surprise.

Built with **Vite + React + Framer Motion + Lucide Icons + Canvas Confetti**.
No backend. Deploys as a static site to Vercel or Netlify.

---

## 1. Run locally

```bash
cd birthday-website
npm install
npm run dev
```

Open http://localhost:5173.

Production build:

```bash
npm run build
npm run preview
```

---

## 2. Personalize (this is where the ❤️ goes)

Almost everything lives in **`src/data/birthdayData.js`** — open that file and edit.

You can change:

| Field | What it does |
|---|---|
| `wifeName` / `husbandName` | Names used across the site |
| `heroPhoto` | Path to the round hero photo (place at `public/assets/photos/hero.jpg`) |
| `caseFile` | Fields shown in the funny investigation case card |
| `evidence` | Evidence cards in the investigation section |
| `reasons` | Flip-card reasons — add as many as you want |
| `memories` | The photo scrapbook (title, date, caption per memory) |
| `timeline` | The vertical timeline chapters |
| `stats` | The funny "Relationship Analytics" bars |
| `heartMessages` | Hidden messages inside the falling hearts in the mini-game |
| `loveLetter` | The full emotional letter (multiline template string) |
| `finalWish` | The wish revealed after the candle is blown out |
| `music` | Path to your song (optional) |

### Adding your own photos

Drop your images into **`public/assets/photos/`** and reference them like:

```js
image: '/assets/photos/memory-01.jpg',
```

If a photo is missing, the site gracefully falls back to a soft pink placeholder — nothing breaks.

### Adding your own song

Drop an MP3 into **`public/assets/music/our-song.mp3`** (or update the `music` path in the data file).
The music player never autoplays, and if the file is missing the player hides itself silently.

---

## 3. Folder structure

```
birthday-website/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── assets/
│       ├── photos/       # ← your photos here
│       └── music/        # ← your song here
└── src/
    ├── App.jsx
    ├── App.css
    ├── main.jsx
    ├── index.css
    ├── data/
    │   └── birthdayData.js         # ← edit this to personalize
    └── components/
        ├── Hero.jsx
        ├── BirthdayInvestigation.jsx
        ├── LoveReasons.jsx
        ├── Memories.jsx
        ├── Timeline.jsx
        ├── RelationshipStats.jsx
        ├── LoveGame.jsx
        ├── EasterEgg.jsx
        ├── LoveLetter.jsx
        ├── BirthdaySurprise.jsx
        ├── MusicPlayer.jsx
        └── FloatingHearts.jsx
```

---

## 4. Deploy

### Vercel (fastest)

1. Push this folder to GitHub.
2. On https://vercel.com → **New Project** → import the repo.
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build` · Output directory: `dist`.
5. Click **Deploy**.

### Netlify

1. Push to GitHub.
2. On https://app.netlify.com → **Add new site** → **Import from Git**.
3. Build command: `npm run build` · Publish directory: `dist`.
4. Deploy.

Or drag-and-drop the `dist/` folder into Netlify Drop after running `npm run build` locally.

---

## 5. Notes

- **Mobile-first**: designed and tuned around 390×844.
- **Reduced motion**: respected — animations soften automatically for users who set that preference.
- **Accessible**: semantic HTML, alt text, keyboard-usable cards, focus outlines, ESC-to-close modal.
- **No autoplay**: the music player only starts on tap.
- **No dependencies you didn't ask for** — just React, Framer Motion, Lucide, and Canvas Confetti.

Happy birthday to her. ❤️
