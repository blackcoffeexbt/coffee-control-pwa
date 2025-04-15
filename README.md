# Coffee Control PWA

A Progressive Web Application (PWA) that allows you to control your coffee machine (or any nip04 watching device) remotely using the Nostr protocol for secure communication. Built with Vue 3 and Vite.

## Features

- 🚀 Progressive Web App (PWA) with offline support
- ☕ Remote coffee machine control via Nostr DMs
- 🔒 Secure communication using NIP-04 encryption
- 🌓 Dark mode support
- 📱 Responsive design for mobile and desktop
- 🔌 Real-time status updates
- 🎨 Clean, modern UI

## Technology Stack

- Vue 3 (Composition API)
- Vite
- Nostr Protocol (nostr-tools)
- SCSS for styling
- PWA capabilities

## Prerequisites

- Node.js (latest LTS version recommended)
- NPM or Yarn
- A Nostr-compatible coffee machine controller
- Your Nostr private key (nsec)

## Project Setup

1. Install dependencies:
```sh
npm install
```

2. Configure your settings:
   - Enter your coffee machine's npub (in hex format)
   - Enter your nsec (in hex format)
   - Set your preferred Nostr relay URL

## Development

For local development with hot-reload:
```sh
npm run dev
```

## Building for Production

Build the application for production:
```sh
npm run build
```

## Linting and Formatting

```sh
# Lint files
npm run lint

# Format files
npm run format
```

## Security Considerations

- Never share your nsec (private key)
- Use secure relay connections (wss://)
- Keep your PWA and dependencies updated

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
