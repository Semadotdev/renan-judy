# Judy & Renan Wedding Invitation

A complete premium animated wedding invitation website for Judy Castillo and Renan Tipactipac, wedding date December 28, 2026.

## Features

- **Cinematic Envelope Reveal** - Interactive opening animation with disappearing wax seal, opening flap, sliding invitation card, and animated ships
- **Elegant Design** - Uses the exact color palette: Milk (#FBF7F4), Oat (#E5DED2), Taupe (#A39382), Mocha (#685D54), Charcoal (#232323)
- **Live Countdown** - Real-time countdown to December 28, 2026 in Asia/Manila timezone
- **All Wedding Sections** - Prologue, hero invitation, our story, countdown, celebration, event details, wedding party, theme overview, dress code, travel notes and accommodation, celebratory gifts, postcard gallery, RSVP, guestbook, FAQ, and closing scene
- **Chapter Navigation** - Desktop progress rail and a compact mobile chapter bar that track the scroll position
- **RSVP Form** - Two-step validated form emailed to the couple via FormSubmit, with localStorage backup
- **Guestbook** - A wishes wall emailed to the couple via FormSubmit, with localStorage display
- **Music Toggle** - Optional royalty-free background music with user-controlled playback
- **Responsive & Accessible** - Mobile-first design, keyboard navigation, touch friendly, reduced motion support
- **Ships Animation** - Gentle animated ships throughout the site (replacing butterflies as requested)

## Tech Stack

- [React](https://reactjs.org/) 18 with TypeScript
- [Vite](https://vitejs.dev/) for fast development and building
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd renan-judy
```

2. Install dependencies
```bash
npm install
```

3. Add background music (optional)
   - Place a royalty-free instrumental MP3 file at `public/audio/royalty-free-instrumental.mp3`
   - See `public/audio/README.md` for recommendations

4. Start the development server
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## Configuration

All wedding details are in a single configuration file: `src/config/weddingConfig.ts`

You can easily update:
- Couple names and wedding date
- Event details, schedule, venue, map, and calendar fields
- Story chapters, wedding party, gallery images, and FAQ entries
- Dress code colors and instructions
- Submission email, RSVP deadline, and guestbook settings
- Music settings

Fields left as `null` or empty render designed "to be announced" placeholders instead of breaking the layout.

## Email Delivery

RSVP replies and guestbook postcards are sent to the address configured at `weddingConfig.submissions.email` using [FormSubmit](https://formsubmit.co/). The current test recipient is `jiroluismanalo24@gmail.com`.

FormSubmit requires one-time activation per recipient:

1. Submit a real RSVP or postcard from the deployed site.
2. Open the activation email sent to the configured address.
3. Click the activation link. Until activated, the form shows FormSubmit's error message.

To switch to the launch recipient, update `submissions.email` in `src/config/weddingConfig.ts` and repeat the activation step.

Submissions are also stored in `localStorage` as a local backup, so the guestbook wall still renders entries on the device that created them.

## Quality Checks

```bash
npm run lint
npm run build
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with default settings

### Netlify
1. Run `npm run build`
2. Drag and drop the `dist/` folder to [Netlify](https://netlify.com)

### Other Platforms
The site is a static SPA and can be deployed to any static hosting service.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Respects `prefers-reduced-motion` for accessibility

## Accessibility Features

- Keyboard navigation support
- ARIA labels on interactive elements
- Focus indicators
- Reduced motion support
- Semantic HTML structure

## Notes

- No venue details, times, or RSVP contact information are hardcoded - they're all configurable
- Secret keys are never exposed in client-side code
- All animations are CSS/Framer Motion based, no external heavy libraries
- Ships are used instead of butterflies throughout the design as requested
