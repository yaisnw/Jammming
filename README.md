# Jammming

> A Spotify playlist builder — search for songs and save them directly to your Spotify account. Built in September 2023 as part of my early React learning.

---

## Features

- 🔍 **Search** the Spotify library by song, artist, or album
- ➕ **Add tracks** to a custom playlist
- ➖ **Remove tracks** from your playlist
- 💾 **Save playlist** directly to your Spotify account

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Spotify Web API | Music search & playlist creation |
| CSS | Styling |

---

## Getting Started

### Prerequisites
- Node.js 20+
- Spotify Developer account

### Installation
```bash
git clone https://github.com/yaisnw/Jammming.git
cd Jammming
npm install
```

### Environment Variables

Create a `.env` file in the root directory:
```env
REACT_APP_SPOTIFY_CLIENT_ID=
REACT_APP_REDIRECT_URI=http://localhost:3000
```

Add your redirect URI to your Spotify Developer Dashboard under **Redirect URIs**.

### Running Locally
```bash
npm start
```

---

## Notes

This project uses Spotify's legacy implicit grant auth flow which has since been deprecated. A future improvement would be migrating to the PKCE flow.
