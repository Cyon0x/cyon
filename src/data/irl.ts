export type IrlPhoto = {
  src: string;
  alt: string;
};

export type IrlStop = {
  code: string;
  ecosystem: string;
  place: string;
  year: string;
  role: string;
  tags: string[];
  note: string;
  photos: IrlPhoto[];
};

export const irlLeadPhoto: IrlPhoto = {
  src: "/irl/04-group.webp",
  alt: "Group photo of Benin City builders outside after a community meetup.",
};

export type IrlEventPhoto = IrlPhoto & {
  /** Mono caption pinned under the frame in the archive band. */
  tag: string;
  /** Frame shape — the band is composed, not a uniform grid of tiles. */
  frame: "lead" | "wide" | "tall";
};

/** One line per verb, so the section states the job plainly next to the proof. */
export const irlRoles: { verb: string; note: string }[] = [
  {
    verb: "HOSTED",
    note: "On the mic and on the day: the room, the run of show, the questions that come after.",
  },
  {
    verb: "PLANNED",
    note: "Concept, format, venue and the guest list, well before anyone walks in.",
  },
  {
    verb: "ORGANISED",
    note: "Partners, logistics, first wallets and the follow-up once everyone has gone home.",
  },
];

/**
 * Events beyond the Benin City route: other rooms, other ecosystems, same job.
 * Order is deliberate — leading wide frame, then a wide/tall/tall row that
 * lands on a shared baseline.
 */
export const irlEventArchive: IrlEventPhoto[] = [
  {
    src: "/irl/08-community-day.webp",
    frame: "lead",
    tag: "COMMUNITY DAY / GROUP SHOT",
    alt: "A large group of attendees posing together in front of a black sponsor wall covered in Web3 partner logos at an in-person community event.",
  },
  {
    src: "/irl/10-on-the-mic.webp",
    frame: "wide",
    tag: "ON THE MIC / FULL HOUSE",
    alt: "A host holding a phone while addressing a packed room of seated attendees at a community meetup.",
  },
  {
    src: "/irl/09-organisers.webp",
    frame: "tall",
    tag: "ORGANISERS / VENUE WALL",
    alt: "Five organisers standing arm in arm in front of a large portrait mural painted on the venue wall.",
  },
  {
    src: "/irl/11-architects-meetup.webp",
    frame: "tall",
    tag: "PANEL / ARCHITECTS MEETUP",
    alt: "Two hosts seated on high stools either side of a speaker, beneath an {ARCHITECTS} Meetup banner during a community panel.",
  },
];

export const irlStops: IrlStop[] = [
  {
    code: "IRL / 001",
    ecosystem: "ARC",
    place: "BENIN CITY",
    year: "2025",
    role: "HOST",
    tags: ["COMMUNITY", "BUILDERS", "WEB3"],
    note:
      "A room of builders in Benin City talking about stablecoins, payments and what is actually worth building on Arc.",
    photos: [
      {
        src: "/irl/01-arc-stage.webp",
        alt: "Cyon speaking on stage at the Arc community meetup in Benin City, beside a screen reading Community Intro and Connect.",
      },
      {
        src: "/irl/05-arc-laptops.webp",
        alt: "Four attendees holding up laptops displaying the Arc logo at a Benin City meetup.",
      },
    ],
  },
  {
    code: "IRL / 002",
    ecosystem: "PLUME",
    place: "BENIN CITY",
    year: "2025",
    role: "HOST",
    tags: ["COMMUNITY", "ONBOARDING"],
    note: "Onboarding people who had heard the word RWA and never seen one.",
    photos: [
      {
        src: "/irl/02-room.webp",
        alt: "A full room of attendees seated and facing a stage during a Benin City builder meetup.",
      },
    ],
  },
  {
    code: "IRL / 003",
    ecosystem: "UNION",
    place: "BENIN CITY",
    year: "2025",
    role: "HOST",
    tags: ["COMMUNITY", "BUILDERS", "INTEROP"],
    note: "Interoperability explained without a single diagram of a bridge.",
    photos: [
      {
        src: "/irl/03-builders.webp",
        alt: "Builders working on laptops during a community session in Benin City.",
      },
    ],
  },
  {
    code: "IRL / 004",
    ecosystem: "JUP",
    place: "BENIN CITY",
    year: "2025",
    role: "HOST",
    tags: ["COMMUNITY", "ONBOARDING"],
    note: "First wallets, first swaps, first questions.",
    photos: [
      {
        src: "/irl/06-cafe.webp",
        alt: "A row of builders seated at a cafe table during an informal Benin City working session.",
      },
      {
        src: "/irl/07-session.webp",
        alt: "Two builders heads-down on laptops and phones during a cafe working session in Benin City.",
      },
    ],
  },
  {
    code: "IRL / NEXT",
    ecosystem: "OPEN SLOT",
    place: "YOUR ECOSYSTEM",
    year: "\u2014",
    role: "HOST",
    tags: ["COMMUNITY", "IRL", "OPEN"],
    note:
      "If your ecosystem needs actual people in an actual room, this slot is the one I want to fill next.",
    photos: [],
  },
];
