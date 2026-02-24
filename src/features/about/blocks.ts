export type AboutEditorialBlock = {
  kind: "editorial";
  catalogLabel: string;
  headline: string;
  layout?: "default" | "centered";
  lines: string[];
};

export type AboutAccordionItem = {
  detail: string;
  summary: string;
};

export type AboutAccordionBlock = {
  kind: "accordion";
  catalogLabel: string;
  headline: string;
  items: AboutAccordionItem[];
};

export type AboutBlock = AboutEditorialBlock | AboutAccordionBlock;

export const ABOUT_BLOCKS: AboutBlock[] = [
  {
    kind: "editorial",
    catalogLabel: "ABOUT_001",
    headline: "About",
    layout: "centered",
    lines: [
      "I'm Andreas, a frontend developer who enjoys the overlap between design and engineering: building interfaces that feel calm, clear, and intentional.",
      "I'm especially interested in product work where the UI is driven by real data: integrations, dashboards, and the kind of features where how information is shaped matters just as much as how it's presented.",
      "When I'm not coding, I'm at the gym or cooking. Both are basically the same hobby: small improvements, done consistently.",
    ],
  },
  {
    kind: "accordion",
    catalogLabel: "PRINCIPLES_002",
    headline: "Philosophies I keep coming back to",
    items: [
      {
        summary: "Clear interfaces come from clear priorities.",
        detail:
          "If a screen tries to do too many things at once, it usually means no one decided what mattered most. The clearest UIs I've seen weren't the result of good taste alone — they were the result of someone making hard decisions about what to leave out.",
      },
      {
        summary:
          "How data is shaped often determines what the interface can do.",
        detail:
          "The structure of an API response, the way a database is modeled, the fields that are missing — these quietly constrain what's possible on screen. I find that thinking about data shape early tends to prevent a lot of late-stage interface compromises.",
      },
      {
        summary:
          "The closer design and code are, the less gets lost between them.",
        detail:
          "A lot of good design decisions don't survive the handoff to code — not because the developer didn't care, but because intent is hard to document. The closer those two things are, the more of it actually makes it to the user.",
      },
      {
        summary:
          "Simple interfaces are usually the result of someone thinking very hard.",
        detail:
          "Simple doesn't mean easy to build. It usually means someone worked through all the complexity first and made deliberate decisions about what the user never needs to see.",
      },
      {
        summary:
          "The best interactions are sometimes the ones you don't notice.",
        detail:
          "A transition that feels right, a state that loads without jarring the eye, a button that's exactly where you expected it — these don't call attention to themselves. That's what makes them work.",
      },
    ],
  },
  {
    kind: "editorial",
    catalogLabel: "WORK_003",
    headline: "How I tend to work",
    layout: "centered",
    lines: [
      "I'd rather understand a problem well than move fast and fix it later. That usually means asking more questions upfront, and iterating until both the data and the interface feel clear.",
      "I find it easier to start from what a product needs to do for the person using it, and work backwards to how it should be built.",
      "I'm looking for a frontend internship where that approach matters — somewhere close to the product, where the focus is on how well something is built, not just that it's done.",
    ],
  },
];
