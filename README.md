# ⚡ Telegram Anti-Spam Bot

🛡️ Cyberpunk-styled anti-spam bot with multi-language support (Thai, Lao, English)

## ✨ Features

- 🌐 **Multi-language**: Thai, Lao, English
- 🎨 **Cyberpunk UI**: Futuristic terminal-style interface
- 🔗 **Whitelist Management**: Control allowed domains
- 📊 **Statistics**: Track violations and violators
- 🔇 **Auto-mute**: Automatically mute users who post unauthorized URLs
- 🎯 **Admin Controls**: Full control panel for group admins

## 🚀 Deployment

### Option 1: Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set up webhook after deployment:
```bash
curl "https://your-domain.vercel.app/api/setup?url=https://your-domain.vercel.app/webhook"
```

### Option 2: Run Locally with Bun

1. Install dependencies:
```bash
bun install
```

2. Create `.env` file:
```env
PORT=3000
WEBHOOK_URL=https://your-ngrok-url.com/webhook
```

3. Run:
```bash
bun run index.ts
```

## 🎮 Usage

1. Add bot to your Telegram group
2. Set bot as **Admin** (with delete messages permission)
3. Type `/panel` in the group
4. Manage via control panel buttons

## 🌐 Language Support

The bot supports 3 languages:
- 🇹🇭 **Thai** (ภาษาไทย) - Default
- 🇱🇦 **Lao** (ພາສາລາວ)
- 🇬🇧 **English**

Change language via the "🌐 LANGUAGE" button in the control panel.

## 📝 Commands

- `/start` - Show welcome message
- `/panel` - Open control panel (Admin only)
- `/addurl <domain>` - Add domain to whitelist (Admin only)
- `/removeurl <domain>` - Remove domain from whitelist (Admin only)

## 🔧 Environment Variables

- `BOT_TOKEN` - Your Telegram bot token (hardcoded in index.ts, move to env for production)
- `PORT` - Port for local server (default: 3000)
- `WEBHOOK_URL` - Webhook URL for Telegram

## 📦 Tech Stack

- **Runtime**: Bun / Vercel Edge Runtime
- **Language**: TypeScript
- **Dependencies**: Zero dependencies (pure fetch API)

## 🎯 Vercel Configuration

The project includes `vercel.json` configured for Edge Runtime deployment.

## ⚠️ Security Note

Remember to move `BOT_TOKEN` to environment variables before deploying to production!
