# Lilac deployment checkpoint

Saved September 22, 2026. The user is closing the workspace, renaming its folder,
and reopening. Next objective: deploy to Vercel, then connect a subdomain of
`anysoft.us`. Read this file when resuming; paths below are relative to this folder.

## Current application

- Next.js App Router, React, TypeScript, Tailwind. Single-page restaurant menu demo.
- Displayed branding and page title are **Lilac**. The npm package name is still
  `anysoft-rosies`; changing the folder name does not require changing it.
- `app/layout.tsx` includes a red banner: “Demo only — this website is not
  associated with any actual business.” Keep this notice.
- `public/favicon.svg` is an original lilac flower placeholder. The selected SVG
  Repo icon could not be downloaded (HTTP 429). The favicon is wired through
  `metadata.icons` in `app/layout.tsx`.
- `lib/menuApi.ts` fetches menu data server-side and normalizes sections, items,
  descriptions, structured prices (`formatted` / `amount_cents`), and variations.
  `components/MenuItemRow.tsx` displays multiple size options with their prices.
- API path remains `/api/v1/menus/rosies`, despite the Lilac display branding.
- Both the fetch and page use 300-second revalidation. User observed immediate
  updates after Shift+F5 in local development; production behavior must be tested.
- API failures still display sample menu data and an explanatory notice. Replacing
  this with an unavailable message was suggested but has NOT been implemented.

## API configuration

Local `.env` and `.env.example` currently use:

```env
MENU_API_BASE_URL=http://localhost:3000
```

User supplied this public tunnel base URL for deployment:

```env
MENU_API_BASE_URL=https://hawaiian-animals-grill-innovation.trycloudflare.com
```

The tunnel endpoint `/api/v1/menus/rosies` was verified with HTTP 200 and returned
5 sections and 25 items. Recheck it when resuming: the temporary tunnel may change
or stop. User plans to deploy the API separately later. Use the base URL only;
the application appends the menu path. This is a server-side variable, without a
`NEXT_PUBLIC_` prefix. Do not commit local `.env`.

## Deployment status and next steps

No Vercel deployment, login, project linking, environment configuration, or DNS
changes have been performed. The Vercel CLI was not found on PATH or in local
dependencies during the previous check. No Vercel tool was available either.

1. Check the renamed workspace and any applicable instructions. Inspect Git state:
   a `.git` directory exists here but `git status` previously reported that this
   was not a Git repository. No commit checkpoint was possible or created.
2. Install/run the Vercel CLI as needed and authenticate interactively. Do not ask
   the user to paste credentials into chat. Account/team choice remains unknown.
3. Proposed project name is `lilac-menu` (not yet created). Deploy first to its
   Vercel-provided domain. A GitHub repository is optional for CLI deployment.
4. Configure `MENU_API_BASE_URL` with the current public API base URL for Production
   and Preview. Updating it later requires a new deployment.
5. Run production validation and verify actual API content, section navigation,
   prices/sizes, demo banner, favicon, and refresh behavior on the deployed site.
6. Ask which subdomain of `anysoft.us` the user wants; none has been selected.
   Determine DNS provider/access, add the domain to Vercel, and use the exact DNS
   record Vercel provides. Verify DNS and HTTPS. Preserve unrelated DNS records.

Vercel Hobby was discussed as the free option for personal, non-commercial use.
Eligibility depends on actual use, not the demo banner. Recheck current plans if
needed rather than assuming commercial use qualifies.

## Validation so far

- Fixed missing local styles after this checkpoint was first written: the page's
  stylesheet returned HTTP 404 after development and production builds shared
  `.next`. `next.config.ts` now uses `.next-dev` for development and `.next` for
  production. `.next-dev` is ignored; Next added its types to `tsconfig.json`.
  After the dev server restarted, both page and stylesheet returned HTTP 200,
  expected Tailwind rules were present, and `npm run typecheck` passed.

- `npm run typecheck` passed after the latest favicon changes.
- Earlier live local rendering on port 3001 was verified for API sections, items,
  prices, multiple sizes, and absence of the fallback notice.
- A production build compiled, passed type checks, and generated pages, but the
  final exit status was not captured; rerun before deployment. This build preceded
  the favicon addition and used the local API setting.
- Local dev command: `npm run dev -- --port 3001` (API uses port 3000).
- Build/start commands: `npm run build` and `npm start`.
- Old process/session IDs should not be relied on after reopening.

## Collaboration preferences

The user wants practical implementation and minimal confirmation interruptions.
Proceed with authorized preparation and deployment work; request only missing
account access, necessary environment permissions, and the specific subdomain.
