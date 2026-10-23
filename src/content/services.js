/* Service-specific content. Domain labels are rendered from site.js. */
export const DOMAIN_PRACTICE = [
  {
    key: 'signal',
    exercise: 'Turn approved public company research into a source-linked account brief.',
    artifact: 'An account-brief template and a checklist for the evidence behind it.',
    review: 'A seller checks the sources, fit and permission to contact. Nothing is sent automatically.',
  },
  {
    key: 'ops',
    exercise: 'Turn approved meeting notes into decisions, owners and due dates.',
    artifact: 'A reviewed action log and instructions for the next weekly review.',
    review: 'The meeting owner confirms each commitment before anyone creates or assigns tasks.',
  },
  {
    key: 'campaigns',
    exercise: 'Draft a message sequence from an approved offer and audience brief.',
    artifact: 'A draft sequence and a simple checklist for claims, tone and relevance.',
    review: 'The campaign owner checks claims, consent and do-not-contact lists before any send.',
  },
  {
    key: 'search',
    exercise: 'Outline a service page and useful buyer answers using verified service facts.',
    artifact: 'A content brief with sources and a map of relevant internal links.',
    review: 'The publisher verifies every claim and approves publication. Search placement is not a promise.',
  },
  {
    key: 'cx',
    exercise: 'Group de-identified customer feedback and draft responses to recurring questions.',
    artifact: 'A feedback taxonomy and a reviewed customer-response guide.',
    review: 'A support owner checks the customer context and approves each external reply.',
  },
  {
    key: 'paid',
    exercise: 'Develop ad concepts and a test brief from approved claims and a budget.',
    artifact: 'Creative variants and an experiment sheet with a clear success measure.',
    review: 'The budget owner approves launches and spend changes. A draft cannot change a campaign.',
  },
  {
    key: 'analytics',
    exercise: 'Outline a useful downloadable resource and the events needed to measure its use.',
    artifact: 'A resource outline, event dictionary and measurement QA checklist.',
    review: 'An analyst verifies calculations, consent and event behavior before using the results.',
  },
  {
    key: 'authority',
    exercise: 'Turn an approved expert interview into an article draft supported by its sources.',
    artifact: 'An editorial brief, first draft and attribution checklist.',
    review: 'The named expert checks quotations and attributed claims before publication.',
  },
  {
    key: 'field',
    exercise: 'Compare public event information and prepare an attendance brief.',
    artifact: 'An event shortlist with dates, sources and a follow-up plan.',
    review: 'The owner confirms current dates, spend and permission to use participant information.',
  },
  {
    key: 'finance',
    exercise: 'Explain variances in a de-identified revenue and expense spreadsheet.',
    artifact: 'Variance commentary linked to verified spreadsheet calculations.',
    review: 'The finance owner checks every figure. No automatic payments or ledger entries.',
  },
];

export const AI_FAQS = [
  {
    question: 'Do we need technical experience?',
    answer: 'No coding background is needed. We start with familiar business tasks and adapt the exercises for beginner and intermediate users. Connecting tools or building a production application is a separate scope.',
  },
  {
    question: 'Which AI tools will we use?',
    answer: 'We agree the tools before training and work in your approved accounts. The core skills carry across tools: give clear instructions, supply useful context, check the result and make the work repeatable. Tool subscriptions are separate.',
  },
  {
    question: 'Can we use our own business work?',
    answer: 'Yes, with approved data and tools. We can begin with public, synthetic or de-identified examples. Confidential information and personal data stay out until your organization has agreed what can be shared and where.',
  },
  {
    question: 'What does the team leave with?',
    answer: 'Reusable prompts and instructions, reviewed examples, a workflow checklist and an adoption scorecard for the agreed work. Your proposal defines the workflows, participants, sessions and follow-through.',
  },
  {
    question: 'How do we know the training is useful?',
    answer: 'We compare similar tasks before and after practice: output quality, total effort and actual reuse. Time spent on review and rework counts too. The scorecard records what changed, rather than assuming every AI draft saves time.',
  },
  {
    question: 'Why not take a free AI course?',
    answer: 'A free course can be the right place to learn the basics. Saleslights adds live practice on your own workflows, useful artifacts, a named reviewer and support putting the learning to work. The value is the application, not a secret set of prompts.',
  },
  {
    question: 'Does training include certification or a working integration?',
    answer: 'Training does not include a professional certification or a production integration. If the workflow needs an application, new permissions or connected systems, we can scope that separately through Software Development.',
  },
];

export const SOFTWARE_TIERS = [
  {
    name: 'Small business',
    price: '$5,999–$13,999',
    detail: 'A focused product or workflow, with a prioritized delivery stream and agreed engineering capacity.',
  },
  {
    name: 'Midmarket',
    price: 'from $18,999',
    detail: 'Multi-team products and more involved integrations, with added testing and release coordination in scope.',
  },
  {
    name: 'Enterprise',
    price: 'from $29,999',
    detail: 'A defined business-unit build with deeper architecture, access and security requirements.',
  },
];

export const SOFTWARE_FAQS = [
  {
    question: 'What does a forward-deployed engineer do?',
    answer: 'Nick works close to your users: understanding the workflow, shaping the product, writing code and checking the result against the business need. A full-stack software engineer works alongside him on architecture, front-end and back-end implementation, integrations and testing.',
  },
  {
    question: 'Can we start with an idea or an existing product?',
    answer: 'Either. We can shape a new product into a useful first version or improve an existing system. We validate the need and agree the smallest sensible release before committing to a broader build. Scope, access and feedback determine the delivery plan.',
  },
  {
    question: 'What is included in a monthly engagement?',
    answer: 'An agreed backlog, engineering capacity, delivery cadence and acceptance process. The statement of work defines contributors, concurrent work and support. The paired model describes responsibilities, not unlimited development or two full-time allocations.',
  },
  {
    question: 'How much does software development cost?',
    answer: 'Small business engagements are $5,999–$13,999 per month; midmarket starts from $18,999 per month and enterprise from $29,999 per month. Pricing changes with scope. We agree capacity and final fees in the statement of work; hosting, software and model/API usage are separate unless included.',
  },
  {
    question: 'Will we own the code, data and accounts?',
    answer: 'The agreement defines ownership of commissioned source code, your business data and account control. We establish repository access and handoff requirements at the start, with exceptions for third-party licences and agreed pre-existing materials.',
  },
  {
    question: 'How do you approach AI and agent security?',
    answer: 'We use scoped permissions, keep authorization outside the model and require approval for high-impact actions. Tests cover unsafe inputs and unauthorized actions. Data boundaries, spend limits, an audit trail and a way to stop execution are part of the design—not left to a prompt.',
  },
  {
    question: 'Is the GTM Engine or a sales professional included?',
    answer: 'No. Software Development is a distinct engagement. We can connect the product to your revenue system, but sales representation, campaigns and other GTM services have their own scope.',
  },
  {
    question: 'What about revenue results and ongoing support?',
    answer: 'We can measure adoption, conversions and costs, then use that evidence to improve the product. We do not guarantee revenue. Maintenance, incident response, service levels and continuing development are included only when the statement of work defines them.',
  },
];
