# Market Opportunities (Next.js Project)

A modern web application built with [Next.js](https://nextjs.org), React, TypeScript, Tailwind CSS, and Framer Motion. The project visualizes and lists market opportunities, such as trending coins, new coins, and top gainers, with a responsive and animated UI.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Main Dependencies](#main-dependencies)
- [Folder Overview](#folder-overview)
- [Customization](#customization)
- [Deployment](#deployment)

---

## Project Structure

All main source code is located in the `src/` directory:

```
src/
  app/           # Next.js app directory (entry, layout, global styles)
  components/    # Reusable React components (lists, icons, UI elements)
    data/        # Mock data for development
    types/       # TypeScript type definitions
  hooks/         # Custom React hooks (e.g., data fetching, responsiveness)
  utils/         # Utility functions (animation, formatting, visibility)
public/          # Static assets (SVGs, images, icons)
```

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Reusable Components** for market lists and items
- **Custom Hooks** for data fetching and responsive design
- **Mock Data** for development and testing

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or yarn dev, pnpm dev, bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `dev` – Start the development server
- `build` – Build for production
- `start` – Start the production server
- `lint` – Run ESLint

## Main Dependencies

- `next` – React framework
- `react`, `react-dom` – UI library
- `framer-motion` – Animations
- `tailwindcss` – Styling
- `typescript` – Type safety

## Folder Overview

- **src/app/**: Next.js entry, layout, and global styles
- **src/components/**: UI components (lists, sliders, icons, skeletons)
  - **data/**: Mock data for development
  - **types/**: TypeScript interfaces and types
- **src/hooks/**: Custom hooks (e.g., `useMarketData`, `useIsMobile`)
- **src/utils/**: Utility functions (animation config, formatting, visibility)
- **public/**: Static files and images (SVGs, icons, wallpapers)

## Customization

- Edit `src/components/data/mockMarketData.ts` to change mock data
- Add or modify components in `src/components/`
- Update styles in `src/app/globals.css` or Tailwind config

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js. See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

---

For more details, see the code in the `src/` directory and the comments in each file.
