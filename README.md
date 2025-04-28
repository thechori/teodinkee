## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploying to Production

This application is deployed via Vercel and uses Git branches to manage the CI/CD pipeline. Simply open a Pull Request for your branch using `main` as the target branch. Once it is merged into the target branch, Vercel will automatically kick off the deployment to production.

## Notes

Had to add `"prebuild": "pnpm run types:generate"` to ensure that types were being generated within Vercel before the build to ensure the types were good - not a problem when types are in git version control, but this is a huge problem when the types are being included via the `kysely-codegen` package (the default approach)
