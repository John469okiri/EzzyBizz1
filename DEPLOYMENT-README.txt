EzzyBIZZ — cleaned Netlify source project

IMPORTANT: This is the source project, not a verified production build.

What was cleaned:
- Preserved the app source, styling, assets, and existing UI.
- Preserved the src/components, src/context, src/data, and src/services folder hierarchy used by the imports.
- Removed the incompatible bun.lock so Netlify can use npm dependency installation from package.json.
- Removed nested ZIP copies and AI Studio metadata to keep the deployment package clear.

Netlify settings:
- Build command: npm run build
- Publish directory: dist
- Node.js: use Node 22 or another version compatible with the project's Vite version.

Before deploying:
1. Upload the project files/folders to the intended GitHub repository, preserving their exact folder structure.
2. Confirm src/App.tsx, src/main.tsx, src/index.css and all src/components/*.tsx files are inside src as shown in this ZIP.
3. Trigger a fresh Netlify deploy and check the build log.

Build verification limitation: dependency installation could not complete in this environment, so a successful production build has NOT been confirmed. Do not treat this ZIP as proven build-tested until Netlify reports a successful build.

Authentication note: this project uses browser-local demo/profile storage, not secure server-backed user accounts.
