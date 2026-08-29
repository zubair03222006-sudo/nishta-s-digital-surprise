import memory1 from "@/assets/memory-1.png.asset.json";
import memory2 from "@/assets/memory-2.png.asset.json";
import memory3 from "@/assets/memory-3.png.asset.json";
import memory4 from "@/assets/memory-4.png.asset.json";
import memory5 from "@/assets/memory-5.png.asset.json";

export const NAME = "Nishta";

/** ---- MEME CARDS -------------------------------------------------- */
export type MemeCard = {
  id: number;
  category: string;
  title: string;
  lines: { text: string; style?: "big" | "muted" | "accent" }[];
  footer?: string;
  tint: "rose" | "cream" | "ink";
};

export const MEMES: MemeCard[] = [
  {
    id: 1,
    category: "POV",
    title: "POV: It's Nishta's birthday",
    lines: [
      { text: "Everyone: Happy Birthday ❤️", style: "muted" },
      { text: "Me:" },
      { text: "I HAVE PREPARED AN ENTIRE WEBSITE FOR THIS.", style: "big" },
    ],
    footer: "Priorities? Questionable.",
    tint: "rose",
  },
  {
    id: 2,
    category: "Breaking News",
    title: "Breaking News 🚨",
    lines: [
      { text: "Local girl Nishta has officially leveled up.", style: "big" },
      { text: "Age +1", style: "accent" },
      { text: "Wisdom +0.5", style: "accent" },
      { text: "Chaos +100", style: "accent" },
    ],
    tint: "ink",
  },
  {
    id: 3,
    category: "Growth",
    title: "Character Development",
    lines: [
      { text: "January Nishta:", style: "muted" },
      { text: "“I need to get my life together.”" },
      { text: "Birthday Nishta:", style: "muted" },
      { text: "“Anyway... where's the cake?” 😭", style: "big" },
    ],
    tint: "cream",
  },
  {
    id: 4,
    category: "Science",
    title: "Scientific Research 🧪",
    lines: [
      { text: "Scientists have confirmed that Nishta's birthday requires:", style: "muted" },
      { text: "87% cake", style: "accent" },
      { text: "9% memes", style: "accent" },
      { text: "4% pretending to be mature", style: "accent" },
    ],
    tint: "rose",
  },
  {
    id: 5,
    category: "Reality Check",
    title: "Expectation vs Reality",
    lines: [
      { text: "Expectation:", style: "muted" },
      { text: "Calm birthday celebration 🌸✨" },
      { text: "Reality:", style: "muted" },
      { text: "HAHAHAHAHAHA WHAT IS HAPPENING 💀", style: "big" },
    ],
    tint: "cream",
  },
  {
    id: 6,
    category: "Public Notice",
    title: "Emergency Announcement 📢",
    lines: [
      { text: "PLEASE REMAIN CALM.", style: "big" },
      { text: "Nishta has become one year older." },
      { text: "Authorities are currently investigating.", style: "muted" },
    ],
    tint: "ink",
  },
  {
    id: 7,
    category: "Law",
    title: "Birthday Rule #1",
    lines: [
      { text: "Today you are legally required to:", style: "muted" },
      { text: "eat cake 🍰", style: "accent" },
      { text: "take pictures 📸", style: "accent" },
      { text: "ignore responsibilities 🗿", style: "accent" },
      { text: "and accept compliments.", style: "accent" },
    ],
    tint: "rose",
  },
  {
    id: 8,
    category: "Classified",
    title: "POV: Someone asks your age",
    lines: [
      { text: "Nishta:", style: "muted" },
      { text: "“That's classified information.”", style: "big" },
    ],
    footer: "🔐 TOP SECRET",
    tint: "ink",
  },
  {
    id: 9,
    category: "Game Log",
    title: "Achievement Unlocked 🏆",
    lines: [
      { text: "NISHTA", style: "big" },
      { text: "✓ Survived another year", style: "accent" },
      { text: "✓ Collected more memories", style: "accent" },
      { text: "✓ Somehow still functioning", style: "accent" },
      { text: "✓ Made it to another birthday", style: "accent" },
    ],
    footer: "Reward: Unlimited cake for 24 hours 🍰",
    tint: "cream",
  },
  {
    id: 10,
    category: "Soft Launch",
    title: "Okay fine...",
    lines: [
      { text: "Behind all the memes...", style: "muted" },
      { text: "You genuinely deserve a really good year." },
      { text: "Happy Birthday, Nishta. ❤️", style: "big" },
    ],
    tint: "rose",
  },
];

/** ---- MEMORY WALL ------------------------------------------------- */
export type Memory = { id: number; label: string; caption: string; src: string };

export const MEMORIES: Memory[] = [
  { id: 1, label: "Memory #01", caption: "Certified chaos.", src: memory1.url },
  { id: 2, label: "Memory #02", caption: "Main character moment.", src: memory2.url },
  { id: 3, label: "Memory #03", caption: "Why are we like this 😭", src: memory3.url },
  { id: 4, label: "Memory #04", caption: "Absolutely no explanation needed.", src: memory4.url },
  { id: 5, label: "Memory #05", caption: "Core memory unlocked.", src: memory5.url },
  { id: 6, label: "Memory #06", caption: "Evidence of a good day.", src: memory1.url },
  { id: 7, label: "Memory #07", caption: "Unbothered. Thriving.", src: memory3.url },
  { id: 8, label: "Memory #08", caption: "Peak Nishta behaviour.", src: memory2.url },
  { id: 9, label: "Memory #09", caption: "Saved to permanent storage. ❤️", src: memory4.url },
];

/** ---- QUIZ -------------------------------------------------------- */
export type Quiz = {
  question: string;
  options: string[];
  correct: number;
  reactionRight: string;
  reactionWrong: string;
};

export const QUIZ: Quiz[] = [
  {
    question: "What's Nishta's most powerful ability?",
    options: ["Overthinking", "Sleeping", "Random chaos", "All of the above 💀"],
    correct: 3,
    reactionRight: "Correct. You may continue existing. 🗿",
    reactionWrong: "Wrong. Obviously it's all of the above. 💀",
  },
  {
    question: "Nishta's reaction when someone says 'we need to talk'?",
    options: [
      "Calm and mature",
      "Instant panic + 47 scenarios",
      "Ignores it forever",
      "Calls a meeting",
    ],
    correct: 1,
    reactionRight: "Exactly. The overthinking starts in 0.2 seconds. 😭",
    reactionWrong: "Nope. Panic mode activates instantly. 😭",
  },
  {
    question: "What is the official Nishta food group?",
    options: ["Vegetables", "Cake", "More cake", "Cake, but at 2AM"],
    correct: 2,
    reactionRight: "Correct. Cake supremacy confirmed. 🍰",
    reactionWrong: "Close, but the answer is always MORE cake. 🍰",
  },
  {
    question: "Her sleep schedule can best be described as...",
    options: ["Disciplined", "A suggestion", "Non-existent", "A conspiracy theory"],
    correct: 1,
    reactionRight: "Right. Sleep is merely a suggestion. 🌙",
    reactionWrong: "Incorrect. It's a suggestion she ignores. 🌙",
  },
  {
    question: "How does Nishta reply to a long emotional text?",
    options: ["A full essay", "'hmm'", "😭😭😭", "Leaves you on seen for 3 days"],
    correct: 2,
    reactionRight: "Correct. Three crying emojis = full emotional support. 😭",
    reactionWrong: "Nah. It's always 😭😭😭.",
  },
];

/** ---- COMPLIMENTS -------------------------------------------------- */
export const COMPLIMENTS: string[] = [
  "You're genuinely one of those people who make conversations more interesting.",
  "You have a personality people remember.",
  "You deserve more confidence in yourself.",
  "Your smile is dangerously underrated.",
  "You make ordinary moments feel less ordinary.",
  "You're stronger than you give yourself credit for.",
  "You're allowed to be proud of how far you've come.",
  "You're genuinely worth celebrating.",
  "Never let one bad day convince you that you're having a bad life.",
  "You're more capable than you think.",
  "You deserve good people and good memories.",
  "And yes... today you're officially the main character. 👑",
];

/** ---- LETTER ------------------------------------------------------- */
export const LETTER: string[] = [
  "Jokes apart, I hope this year gives you more reasons to smile, more moments you'll want to remember, and people who genuinely make you happy.",
  "I hope you become more confident in yourself, chase the things you actually want, and never forget how much potential you have.",
  "And whenever life gets a little too serious...",
  "remember that somewhere on the internet, there is an unnecessarily complicated website made specifically to wish you Happy Birthday. 😭❤️",
  "Stay exactly as weird, chaotic and amazing as you are.",
  "Happy Birthday, Nishta. 🤍",
];

/** Replace with your own track (put a file in /public/audio/). */
export const MUSIC_SRC = "/audio/birthday.mp3";
