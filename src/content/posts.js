/* AI Lab posts. Each opens with a direct answer (the block answer engines quote),
   then the argument. Authored by the Saleslights AI Lab for Nick Krause's review
   before production launch. No invented statistics. */

export const POSTS = [
  {
    slug: 'what-is-revenue-infrastructure',
    kind: 'Essay',
    title: 'What revenue infrastructure actually is',
    dek: 'Not a tool stack. The connected system that decides who to pursue, what to say and what happens next.',
    date: '2026-10-23',
    answer: 'Revenue infrastructure is the connected set of data, systems, workflows and people that determines who a company pursues, what it says, how it reaches buyers, what happened, and what should happen next. It differs from a tool stack in one way: every part writes to and reads from the same record, so each outcome changes the next action.',
    body: [
      ['p', 'Most B2B companies own the parts. A CRM, a data provider, a sequencing tool, a dialer, an analytics property, a content calendar. What they rarely own is the connection between them — the place where a signal from one becomes a decision in another.'],
      ['h2', 'The test: does a result change the next action?'],
      ['p', 'If a prospect replies to an email and nothing about the call list, the LinkedIn sequence or the content plan changes, you have tools, not infrastructure. Infrastructure is the plumbing that carries that reply into the rest of the system.'],
      ['h2', 'What it is made of'],
      ['ul', [
        'Signals: intent and demand evidence that tells you who is in market now.',
        'Prospecting: a scored account universe and buying committees, not a list of addresses.',
        'Campaigns: email, LinkedIn, phone and mail coordinated as one motion.',
        'Search: being found by people and cited by answer engines.',
        'Analytics and finance: knowing what converted and what it cost.',
        'Operations: owners, dates and blockers, reviewed every week.',
      ]],
      ['h2', 'Why people still matter'],
      ['p', 'Agents are good at research, orchestration and reporting. They are not yet good at being trusted in a room. The infrastructure exists to put a capable person in front of the right buyer at the right moment with the right context — and then to learn from what happened.'],
      ['p', 'That is the design principle behind the Saleslights Master Revenue Engine: one brain, every revenue function connected to it, and humans approving what ships.'],
    ],
  },
  {
    slug: 'ai-sdr-needs-a-person-in-market',
    kind: 'Point of view',
    title: 'Why the AI SDR needs a person in market',
    dek: 'Automation can multiply reach. It cannot yet carry a relationship. Pair them.',
    date: '2026-10-23',
    answer: 'AI sales agents are effective at research, personalisation at scale and follow-up discipline, but buyers still validate decisions with people. The strongest outbound model pairs an agentic engine — doing the research, orchestration and reporting — with a human seller who holds the conversation and the relationship.',
    body: [
      ['p', 'The last two years produced a wave of products that promise to replace the sales development rep. Some of the underlying capabilities are genuinely useful. The promise is the problem.'],
      ['h2', 'What automation does well'],
      ['ul', [
        'Researching accounts and people faster than any human can.',
        'Keeping follow-up honest: nothing falls through the cracks.',
        'Testing messages and channels systematically.',
        'Reporting what happened without anyone filling in a spreadsheet.',
      ]],
      ['h2', 'What it does not do'],
      ['p', 'It does not walk into an event and recognise the one person who matters. It does not hear hesitation on a call and change course. It does not carry trust from one conversation to the next. In considered B2B purchases, those moments decide the deal.'],
      ['h2', 'The pairing'],
      ['p', 'Our core program puts a dedicated sales professional in market and gives them an engine: priority signals each morning, a researched account, coordinated touches and a weekly read-out. The person sells. The system makes them faster and better informed every week.'],
    ],
  },
  {
    slug: 'cold-calling-opener-system',
    kind: 'Field note',
    title: 'Cold calling still works. Openers usually do not.',
    dek: 'The first ten seconds decide the next thirty. A short system for rebuilding them.',
    date: '2026-10-23',
    answer: 'Cold calls most often fail in the opening seconds, when the prospect decides whether to keep listening. A better opener names who you are, why you are calling this person specifically, and asks permission for thirty seconds — then earns them with a relevant observation rather than a pitch.',
    body: [
      ['p', 'When teams tell us cold calling has stopped working, we listen to the calls before we agree. The pattern is usually the same: the problem is not the channel, it is the first ten seconds.'],
      ['h2', 'Three parts of an opener'],
      ['ul', [
        'Identity: who you are, plainly, without a title the prospect has to decode.',
        'Reason: why this person, now — a trigger, a role, a relevant change.',
        'Permission: ask for a short window, then respect it.',
      ]],
      ['h2', 'Then earn the thirty seconds'],
      ['p', 'Lead with an observation about their world, not a description of yours. If the observation is right, the prospect will ask what you do. If it is wrong, you learn something for the next call.'],
      ['h2', 'Make it a system'],
      ['p', 'Write the openers down, rehearse them, record the calls and review them weekly against the standard. That is the core of our cold-call training — built from your team’s real calls, not a generic script.'],
    ],
  },
];

export const SHELF = [
  ['Video', 'In production', 'Short working sessions from Nick on revenue systems, search and selling.'],
  ['Workshops', 'In development', 'Off-the-shelf cold-calling and outbound workshops for smaller teams.'],
  ['Enriched lead data', 'Waitlist', 'Researched, scored lead sets from the Saleslights prospecting engine, by segment.'],
];
