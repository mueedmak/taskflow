# Taskflow

A simple Next.js + TypeScript task tracker. Add tasks, mark them complete, filter them, and clear completed items. Tasks are stored in this browser using localStorage; there is no account or database.

## Run locally (PowerShell)

```powershell
cd 'A:\WEB PROGRAMMING\NEXTJS\taskflow'
npm install
npm run dev
```

Open http://localhost:3000. Stop the server with Ctrl+C.

## Production check

```powershell
npm run build
npm start
```

## Deploy with Vercel

1. Sign in at https://vercel.com using GitHub.
2. Select **Add New > Project** and import the `taskflow` repository.
3. Keep the detected Next.js defaults and select **Deploy**. No environment variables are needed.
4. Future pushes to `main` deploy automatically after the GitHub integration is connected.

Alternatively run `npx vercel@latest` from this directory, sign in, and follow the prompts. Use `npx vercel@latest --prod` for production.

## Notes

This app uses Next.js App Router, React, TypeScript, and responsive CSS. Browser storage is local to each device and browser. Clearing site data removes saved tasks.
