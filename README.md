# thought.log

A minimal PWA for capturing thoughts on the go. Works offline, installs on Android and Windows, no accounts needed.

## What it does

- **Auto-stamps** date and time in `[YYMMDD HH:MM]` format
- **Voice input** (Italian) via the mic button — or just type
- **#tags** for categorizing thoughts, with tap-to-insert suggestions
- **Copy as .txt** exports everything in a plain text format ready for Google Drive
- **Offline support** — works without internet after first load
- **Installable** — behaves like a native app on your phone and PC

## Format

```
[260408 09:15]
@ walking to the lab, thinking about bench test
- the Bowden cable routing might work better with offset pulleys #removable
- need to check EMG filtering cutoff with Marco

[260408 21:30]
@ cooking, no particular trigger
- what if the thesis cards also worked as student checklists #didattica
```

## Install

1. Open your hosted URL in **Chrome** (Android or Windows)
2. **Android**: tap ⋮ → "Install app" or "Add to Home screen"
3. **Windows**: click the ⊕ install icon in the address bar

## Data

All data is stored locally in your browser (`localStorage`). Nothing is sent anywhere. Use "copy as .txt" to back up your thoughts to Google Drive or wherever you like.

## Files

| File | What it does |
|------|-------------|
| `index.html` | The entire app (HTML + CSS + JavaScript, heavily commented) |
| `manifest.json` | Tells the browser this is an installable app |
| `sw.js` | Service Worker — caches files for offline use |
| `icon-192.png` | App icon (192×192) |
| `icon-512.png` | App icon (512×512) |
