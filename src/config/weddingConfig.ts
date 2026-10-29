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
    storage: "localStorage" as const, // For production, set to "supabase" and configure env vars
  },
  music: {
    enabled: true,
    src: "/audio/royalty-free-instrumental.mp3",
  },
} as const;
