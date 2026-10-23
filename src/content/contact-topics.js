// Shared by the visible selector, query preselection and strict API validation.
// Preserve legacy values so existing campaign links remain valid.
export const CONTACT_TOPICS = [
  ['gtm-engine', 'GTM Engine & Sales Professional (retainer)'],
  ['revenue-infrastructure', 'Revenue infrastructure implementation'],
  ['training', 'Sales Training'],
  ['ai-training', 'AI Training'],
  ['software-development', 'Software Development'],
  ['lead-data', 'Enriched lead data'],
  ['speaking', 'Speaking or workshop'],
  ['other', 'Something else'],
];
export const CONTACT_TOPIC_VALUES = CONTACT_TOPICS.map(([value]) => value);
