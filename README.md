This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview

Configured with the following:

-   Tailwind
-   Firebase Authentication: Passwordless login.
-   Firebase Next Auth Edge: to link client side authentication with the server

## Organization

-   Config: contains the files that initialize the database and authentication logic for client and server.

## Important Principles

-   Authentication: Login and Logout
    Talk about how this will store cookies automatically validate and invalidate them.
    Making use of firebase auth edge.
-   Fetching Data: API Route Handlers
    Talk about using the api - allowing anyone to read the endpoints defined in the api directory. Use return types for type safety. Employ the use of Next's caching logic.
-   Mutating Data: Server Actions
    Employ Next's use of cache invalidation.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Resources

-   Setting up [firebase with nextJS 13](https://www.freecodecamp.org/news/create-full-stack-app-with-nextjs13-and-firebase/)
