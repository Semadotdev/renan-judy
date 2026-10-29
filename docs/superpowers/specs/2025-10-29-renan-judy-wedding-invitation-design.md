# Renan & Judy Wedding Invitation Website - Design Spec

## Overview
Create a complete premium animated wedding invitation website for Judy Castillo and Renan Tipactipac, wedding date December 28, 2026. Feels like opening a luxurious physical invitation with cinematic envelope reveal animation.

## Requirements Summary
- Palette: Milk (#FBF7F4), Oat (#E5DED2), Taupe (#A39382), Mocha (#685D54), Charcoal (#232323)
- Envelope reveal: wax seal disappears, flap opens, card slides up; with animated ships (replacing butterflies as requested)
- Typography: script for couple names, serif headings, sans-serif for buttons
- Sections: hero/envelope, countdown (Asia/Manila), celebration, event details (configurable/hide unknown), dress code with color swatches, RSVP form with localStorage backend (as requested), music toggle, closing
- Tech: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide icons (minimal)
- Responsive, accessible, keyboard/touch friendly, reduced motion support
- All details in single config file
- No fake venue/time/RVSP contact info

## Architecture
- Vite + React + TypeScript project
- Tailwind CSS for styling with custom color tokens
- Framer Motion for animations
- Single config file (src/config/weddingConfig.ts) for all wedding details
- Components: EnvelopeReveal, InvitationCard, ShipAnimation, CountdownTimer, EventDetails, DressCode, RSVPForm, MusicToggle, etc.
- Local storage for RSVP (as specified) with clear integration point comments for Supabase if needed later
- Ships instead of butterflies throughout

## Design Details
- Paper textures via CSS/SVG patterns
- 3D perspective for envelope opening
- Ships animated gently across scenes
- Fonts: Google Fonts (Great Vibes/Parisienne for script, Cormorant Upright for serif headings, Inter/Plus Jakarta for sans)
- Wax seal with minimal ship emblem
- Countdown using date-fns or native Date, timezone Asia/Manila
- RSVP validation (name required, attendance required, guest count >=1 if attending)
- Music toggle with royalty-free audio, starts on interaction

## Implementation Plan Outline
1. Project scaffolding (Vite + React + TS + Tailwind)
2. Config file and design tokens
3. Assets/fonts setup
4. Envelope reveal animation with ships
5. Invitation card and main sections
6. Countdown, event details, dress code
7. RSVP form with localStorage
8. Music toggle
9. Responsive/a11y/reduced motion
10. Documentation

