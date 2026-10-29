# Renan & Judy Wedding Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete premium animated wedding invitation website for Judy Castillo and Renan Tipactipac (Dec 28, 2026) with cinematic envelope reveal, animated ships, countdown, RSVP with localStorage, music toggle, all sections, responsive and accessible.

**Architecture:** Vite + React + TypeScript app with Tailwind CSS, Framer Motion for animations. Single config file for all wedding details. Component-based architecture. LocalStorage for RSVP (with clear Supabase integration point). Ships replace butterflies throughout.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React, Google Fonts

---

### Task 1: Initialize Vite + React + TypeScript project with dependencies

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `tailwind.config.js`, `postcss.config.js`

- [ ] **Step 1: Scaffold with Vite**

Run:
```bash
cd /home/jiromanalo/Projects/renan-judy
npm create vite@latest . -- --template react-ts
```

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer @types/node
npx tailwindcss init -p
```

- [ ] **Step 3: Configure Tailwind with custom colors**

Update `tailwind.config.js` with palette.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: scaffold vite react ts with deps"
```

### Task 2: Create wedding configuration file

**Files:**
- Create: `src/config/weddingConfig.ts`

- [ ] **Step 1: Write config with all details**

```typescript
export const weddingConfig = {
  couple: {
    person1: "Judy Castillo",
    person2: "Renan Tipactipac",
  },
  date: "2026-12-28",
  timezone: "Asia/Manila",
  colors: {
    milk: "#FBF7F4",
    oat: "#E5DED2", 
    taupe: "#A39382",
    mocha: "#685D54",
    charcoal: "#232323",
  },
  eventDetails: {
    ceremony: { time: null, venue: null },
    reception: { time: null, venue: null },
  },
  dressCode: {
    colors: ["#FBF7F4", "#E5DED2", "#A39382", "#685D54", "#232323"],
    instructions: null,
  },
  rsvp: {
    enabled: true,
    storage: "localStorage" as const, // or "supabase"
  },
  music: {
    enabled: true,
    src: "/audio/royalty-free-instrumental.mp3",
  },
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add src/config/weddingConfig.ts
git commit -m "feat: add wedding configuration"
```

### Task 3: Setup fonts and global styles

**Files:**
- Modify: `index.html`, `src/index.css`, `tailwind.config.js`

- [ ] **Step 1: Add Google Fonts to index.html**

Add Great Vibes, Cormorant Upright, Inter.

- [ ] **Step 2: Update global styles with paper texture and color variables**

- [ ] **Step 3: Commit**

```bash
git add index.html src/index.css tailwind.config.js
git commit -m "style: add fonts and global styles with palette"
```

### Task 4: Create ShipAnimation component (replacing butterflies)

**Files:**
- Create: `src/components/ShipAnimation.tsx`

- [ ] **Step 1: Create animated ship SVG component**

Ships float gently across screen with CSS transforms/Framer Motion.

- [ ] **Step 2: Commit**

```bash
git add src/components/ShipAnimation.tsx
git commit -m "feat: add animated ship component"
```

### Task 5: Create EnvelopeReveal component with full animation

**Files:**
- Create: `src/components/EnvelopeReveal.tsx`

- [ ] **Step 1: Build envelope with wax seal (ship emblem), flap animation**

Use Framer Motion for 3D transforms, sequence of animations.

- [ ] **Step 2: Commit**

```bash
git add src/components/EnvelopeReveal.tsx
git commit -m "feat: add envelope reveal with ship seal animation"
```

### Task 6: Create InvitationCard and main sections

**Files:**
- Create: `src/components/InvitationCard.tsx`, `src/components/CountdownTimer.tsx`, `src/components/EventDetails.tsx`, `src/components/DressCode.tsx`, `src/components/RSVPForm.tsx`, `src/components/MusicToggle.tsx`, `src/components/ClosingSection.tsx`

- [ ] **Step 1: Build all components per requirements**

- [ ] **Step 2: Commit**

```bash
git add src/components/
git commit -m "feat: add invitation card and all sections"
```

### Task 7: Assemble App and add responsive/a11y/reduced motion

**Files:**
- Modify: `src/App.tsx`, `src/index.css`

- [ ] **Step 1: Put together full app with all sections**

- [ ] **Step 2: Add prefers-reduced-motion support**

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx src/index.css
git commit -m "feat: assemble app with responsive and a11y support"
```

### Task 8: Add README with setup and deployment instructions

**Files:**
- Create: `README.md`

- [ ] **Step 1: Document setup, env vars, Supabase integration point, deployment**

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add setup and deployment instructions"
```
