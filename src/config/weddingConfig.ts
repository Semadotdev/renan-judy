export interface EventDetail {
  time: string | null;
  venue: string | null;
  address: string | null;
  mapQuery: string | null;
  calendarStart: string | null;
}

export interface ScheduleItem {
  time: string;
  title: string;
  detail: string;
}

export interface StoryChapter {
  year: string;
  title: string;
  body: string;
}

export interface WeddingPartyMember {
  name: string;
  role: string;
  note: string;
  image: string | null;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface WeddingConfig {
  couple: {
    person1: string;
    person2: string;
  };
  date: string;
  timezone: string;
  colors: {
    milk: string;
    oat: string;
    taupe: string;
    mocha: string;
    charcoal: string;
  };
  eventDetails: {
    ceremony: EventDetail;
    reception: EventDetail;
  };
  schedule: ScheduleItem[];
  story: StoryChapter[];
  weddingParty: WeddingPartyMember[];
  gallery: GalleryImage[];
  faq: FaqItem[];
  map: {
    query: string | null;
    url: string | null;
  };
  hashtag: string;
  dressCode: {
    colors: string[];
    instructions: string | null;
    note: string | null;
  };
  rsvp: {
    enabled: boolean;
    storage: 'localStorage' | 'supabase';
    deadline: string | null;
  };
  guestbook: {
    enabled: boolean;
    storage: 'localStorage' | 'supabase';
  };
  music: {
    enabled: boolean;
    src: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    person1: 'Judy Castillo',
    person2: 'Renan Tipactipac',
  },
  date: '2026-12-28',
  timezone: 'Asia/Manila',
  colors: {
    milk: '#FBF7F4',
    oat: '#E5DED2',
    taupe: '#A39382',
    mocha: '#685D54',
    charcoal: '#232323',
  },
  eventDetails: {
    ceremony: {
      time: null,
      venue: null,
      address: null,
      mapQuery: null,
      calendarStart: null,
    },
    reception: {
      time: null,
      venue: null,
      address: null,
      mapQuery: null,
      calendarStart: null,
    },
  },
  schedule: [],
  story: [],
  weddingParty: [],
  gallery: [],
  faq: [
    {
      question: 'Where are the ceremony and reception?',
      answer:
        'Venue details will be shared here as soon as they are confirmed. Save the date for now, and check back for the full route.',
    },
    {
      question: 'What should I wear?',
      answer:
        'We invite you to dress in the palette below. Full dress code notes will be added here when the details are finalised.',
    },
    {
      question: 'Can I bring a guest?',
      answer:
        'Please include your guest count when you send your RSVP so we can plan the celebration properly.',
    },
    {
      question: 'When should I reply?',
      answer:
        'Please send your RSVP as soon as you can. A final reply date will be shared here once it is set.',
    },
  ],
  map: {
    query: null,
    url: null,
  },
  hashtag: '#JudyAndRenan',
  dressCode: {
    colors: ['#FBF7F4', '#E5DED2', '#A39382', '#685D54', '#232323'],
    instructions: null,
    note: 'A palette of milk, oat, taupe, mocha, and charcoal.',
  },
  rsvp: {
    enabled: true,
    storage: 'localStorage',
    deadline: null,
  },
  guestbook: {
    enabled: true,
    storage: 'localStorage',
  },
  music: {
    enabled: true,
    src: '/audio/royalty-free-instrumental.mp3',
  },
};
