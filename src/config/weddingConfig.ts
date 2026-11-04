export interface EventDetail {
  time: string | null;
  venue: string | null;
  address: string | null;
  mapQuery: string | null;
  mapUrl: string | null;
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
  role?: string;
  note?: string;
  image?: string | null;
}

export interface WeddingPartyGroup {
  title: string;
  intro?: string;
  members: WeddingPartyMember[];
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

export interface ThemeOverview {
  style: string[];
  mood: string[];
  primaryColors: string[];
  accentColors: string[];
  backgroundColors: string[];
}

export interface Accommodation {
  name: string;
  address: string;
  phone: string | null;
}

export interface TravelTip {
  title: string;
  body: string[];
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
  weddingParty: WeddingPartyGroup[];
  gallery: GalleryImage[];
  faq: FaqItem[];
  map: {
    query: string | null;
    url: string | null;
    label: string | null;
  };
  hashtag: string;
  theme: ThemeOverview;
  dressCode: {
    title: string;
    colors: string[];
    instructions: string;
    note: string;
    formal: string;
    guests: string;
    palette: string;
    closing: string;
  };
  travel: {
    intro: string;
    accommodations: Accommodation[];
    tips: TravelTip[];
    qrImage: string;
    qrCaption: string;
  };
  gifts: {
    intro: string;
    body: string;
    thanks: string;
  };
  closing: {
    eyebrow: string;
    title: string;
    body: string;
  };
  submissions: {
    email: string;
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
      time: '9:30 AM',
      venue: 'Holy Family Parish Church',
      address: 'Bolo, Bauan, Batangas',
      mapQuery: 'Holy Family Parish Church, Bolo, Bauan, Batangas',
      mapUrl: 'https://maps.app.goo.gl/EUta3CB6V7GLFp9L8',
      calendarStart: '2026-12-28T09:30:00+08:00',
    },
    reception: {
      time: '11:30 AM',
      venue: 'Castillo Residence',
      address: 'Sinturisan, Locloc, Bauan, Batangas',
      mapQuery: 'Sinturisan, Locloc, Bauan, Batangas',
      mapUrl: 'https://maps.app.goo.gl/7A4dJjpQemsBePcb8',
      calendarStart: '2026-12-28T11:30:00+08:00',
    },
  },
  schedule: [],
  story: [
    {
      year: '2018',
      title: 'A First Hello',
      body: "We first met in 2018, but that's not when our love story began.",
    },
    {
      year: '2024',
      title: 'Hallway Helloes',
      body:
        "It started in 2024, with short exchanges of hi's and hello's in the hallway of Unity Hall in Seatrium Subic. Sharing leftover meals, helping with carrying the laundry, and the time she asked him for a little favor — a ride to a pickup stop on her way to Manila. They were nothing more than ordinary moments back then, never knowing they would someday become fond memories of how our story unfolded.",
    },
    {
      year: '2024',
      title: 'Back to Batangas',
      body:
        'Later that same year, life brought us both back to Batangas, where everything slowly began to fall into place. With a little help from the playful teasing of friends and colleagues, and through countless messages that gradually became part of our everyday lives, friendship turned into something more. Despite the age difference, we found ourselves falling in love, almost as if everything had been written in a script, for there was no other time possible that we would fall for each other but that moment. Looking back, we believe there was an Architect behind our love story, quietly weaving our paths together from the very beginning — the One watching over us from above.',
    },
    {
      year: 'Forever',
      title: 'Written in the Stars',
      body: 'What began as simple encounters became a love we now get to call forever.',
    },
  ],
  weddingParty: [
    {
      title: 'Parents of the Bride',
      members: [{ name: 'Neneth Castillo' }],
    },
    {
      title: 'Parents of the Groom',
      members: [{ name: 'Bartolome Tipactipac & Corseni Tipactipac' }],
    },
    {
      title: 'Principal Sponsors',
      members: [
        { name: 'Cornelio Castillo & Geronima Castillo' },
        { name: 'Jingle Exson' },
        { name: 'Antonio Castillo & Cosmera Castillo' },
        { name: 'Vivencio Manalo & Emma Manalo' },
        { name: 'John Lou Datinggaling & Marilyn Datinggaling' },
        { name: 'Roberto Dipasupil & Victoria Dipasupil' },
        { name: 'Fernando De Jesus & Lea De Jesus' },
        { name: 'Jonathan Metrillo & Luningning Metrillo' },
      ],
    },
    {
      title: 'Best Man & Matron of Honor',
      members: [
        { role: 'Best Man', name: 'Renz Kimlee Adame' },
        { role: 'Matron of Honor', name: 'Lady Ann Nabablit' },
      ],
    },
    {
      title: 'Secondary Sponsors',
      members: [
        { role: 'Veil', name: 'Jerald Dotimas & Angelica Bianea Aringo' },
        { role: 'Cord', name: 'Christian Castillo & Joriebel Silang' },
        { role: 'Candle', name: 'March Andriel Silang & Gale Anne Celis' },
        { role: 'Candle', name: 'John Lester Baterna & Brianna Essense Robles' },
        { role: 'Coin Bearer', name: 'John Gabriel Gutierrez & Khyra Jean Fandino' },
        { role: 'Bible Bearer', name: 'Sky Kristoff Castillo & Sofia Mori Castillo' },
        { role: 'Ring Bearer', name: 'Francis Silang & Khaylenn Espiritu' },
      ],
    },
    {
      title: 'Flower Escort & Flower Girl',
      members: [
        { role: 'Flower Escort', name: 'Kelzy Fandiño' },
        { role: 'Flower Girl', name: 'Avery Castillo' },
      ],
    },
  ],
  gallery: [],
  faq: [
    {
      question: 'Where are the ceremony and reception?',
      answer:
        'The ceremony begins at 9:30 AM at Holy Family Parish Church in Bolo, Bauan, Batangas. The reception follows at 11:30 AM at the Castillo Residence in Sinturisan, Locloc, Bauan, Batangas.',
    },
    {
      question: 'What should I wear?',
      answer:
        'We suggest comfortable elegance in oat, taupe, and mocha. Our Ninongs and Ninangs are invited to wear formal attire — a Barong, Suit, or Formal Dress. Guests may come in semi-formal attire that complements our Modern Minimalist theme.',
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
    {
      question: 'Where can I stay?',
      answer:
        'We have listed nearby resorts and hotels in the Travel Notes section, including La Thalia Beach Resort, Luzoy Beach Resort, Alexis Beach Resort, Seascape Resort Batangas, and Alegria Hotel.',
    },
    {
      question: 'Are gifts expected?',
      answer:
        'Your presence is the greatest gift we could ask for. If you wish to bless us with a gift, a little contribution toward our new beginning would be lovingly appreciated.',
    },
  ],
  map: {
    query: 'Sinturisan, Locloc, Bauan, Batangas',
    url: 'https://maps.app.goo.gl/7A4dJjpQemsBePcb8',
    label: 'Sinturisan, Locloc, Bauan, Batangas',
  },
  hashtag: '#JudyAndRenan',
  theme: {
    style: ['Modern Minimalist', 'Elegant', 'Timeless'],
    mood: ['Intimate', 'Sophisticated', 'Warm'],
    primaryColors: ['Oat', 'Taupe', 'Mocha'],
    accentColors: ['Milk', 'Charcoal'],
    backgroundColors: ['Warm Ivory', 'Almond Beige'],
  },
  dressCode: {
    title: 'Comfortable Elegance',
    colors: ['#E5DED2', '#A39382', '#685D54', '#FBF7F4', '#232323'],
    instructions:
      'We have a suggested dress code to complement our wedding theme, but please know that we do not want you to feel obligated to follow it strictly. Your comfort is just as important to us.',
    note:
      'We encourage everyone to dress comfortably and elegantly in a way that reflects our Modern Minimalist theme and color palette.',
    formal:
      'For our beloved Ninongs & Ninangs: We would love to see you in formal attire — Barong, Suit, or Formal Dress.',
    guests:
      'For our dear guests: Semi-formal attire is recommended, keeping in harmony with our wedding theme and color palette.',
    palette: 'Oat | Taupe | Mocha',
    closing:
      'Above all, please wear what makes you feel comfortable and confident. We look forward to celebrating this special day with you!',
  },
  travel: {
    intro:
      'A few nearby places to stay and practical notes for the journey to Bauan.',
    accommodations: [
      {
        name: 'La Thalia Beach Resort',
        address: 'Sitio Bubuyan, Locloc, Bauan, Batangas City',
        phone: '0919 818 3991',
      },
      {
        name: 'Luzoy Beach Resort',
        address: 'Sitio Bubuyan, Locloc, Bauan, Batangas City',
        phone: '0939 559 0041',
      },
      {
        name: 'Alexis Beach Resort',
        address: 'Sitio Bubuyan, Locloc, Bauan, Batangas City',
        phone: '0916 211 6116',
      },
      {
        name: 'Seascape Resort Batangas',
        address: 'Sta. Maria, Bauan, Batangas',
        phone: '0915-928-7501',
      },
      {
        name: 'Alegria Hotel',
        address: 'Sta. Maria, Bauan, Batangas',
        phone: null,
      },
    ],
    tips: [
      {
        title: 'Going to the Ceremony',
        body: [
          'Holy Family Parish Church, Bolo, Bauan, Batangas',
          'The travel time from Metro Manila to Bauan is approximately 2 to 3.5 hours by private vehicle, depending on traffic and your point of departure.',
          'For guests traveling by private vehicle, the usual route is via SLEX and STAR Tollway, followed by the local roads leading to Bauan.',
          'For those commuting, you may take a provincial bus bound for Batangas City from PITX or Buendia. From Batangas City Grand Terminal, take local transportation going to Bauan.',
          'We recommend leaving early to allow enough travel time, especially during weekends and holidays.',
          'You may search for Holy Family Parish Church – Bolo, Bauan, Batangas on Google Maps or Waze for easier navigation.',
        ],
      },
      {
        title: 'Going to the Reception',
        body: [
          'Sinturisan, Locloc, Bauan, Batangas',
          'After the ceremony, guests are invited to proceed to our reception venue in Sinturisan, Locloc, Bauan, Batangas.',
          'For easier navigation, kindly use the Google Maps location pin provided in our invitation rather than searching for the general address.',
          'Guests traveling by private vehicle are encouraged to prepare their navigation before leaving the church.',
          'For those commuting, we recommend arranging transportation in advance for a more convenient journey.',
        ],
      },
    ],
    qrImage: '/images/maps-qr-reception.png',
    qrCaption: 'Scan for reception directions',
  },
  gifts: {
    intro:
      'Your presence is the greatest gift we could ever ask for. Celebrating this special day with the people we hold dear means the world to us.',
    body:
      'If you wish to bless us with a gift, a little contribution toward our new beginning would be lovingly appreciated.',
    thanks: 'Thank you for being part of our forever.',
  },
  closing: {
    eyebrow: 'Until the very end',
    title: 'The celebration doesn’t end with “I do.”',
    body:
      'We hope you’ll stay with us until the very end as we continue the celebration, share laughter, create beautiful memories, and enjoy every special moment together. Your presence makes our day even more meaningful, and we’d love to have you with us throughout the entire celebration.',
  },
  submissions: {
    email: 'jiroluismanalo24@gmail.com',
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
