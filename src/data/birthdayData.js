// ============================================================================
//  🎂  Edit everything here to personalize the birthday page.
//      Tone: fun / cute / playful / a little bit romantic.
// ============================================================================

export const birthdayData = {
  // -----------------------------------------------------------
  // Basics
  // -----------------------------------------------------------
  wifeName: 'Neenu',
  husbandName: 'Vishnu',

  // Birthday date (local time). Before this moment the site shows a countdown;
  // from this moment onward the full birthday site is revealed. Add ?preview=1
  // to any URL to bypass the countdown while testing.
  birthdayDate: '2026-09-05T00:00:00',
  birthdayLabel: 'September 5th',

  // Hero photo (round frame). Replace with a favourite photo of the two of you.
  heroPhoto: '/assets/photos/hero.jpg',

  // Optional distinct closing photo. Falls back to heroPhoto if missing.
  finalPhoto: '/assets/photos/final.jpg',

  // -----------------------------------------------------------
  // Chapter labels (used by ChapterHeader)
  // -----------------------------------------------------------
  chapters: {
    report:    { number: '01', title: 'Official Birthday Report',        emoji: '📋' },
    thingsYouDo: { number: '02', title: 'Things You Do',                 emoji: '😂' },
    memories:  { number: '03', title: 'Some Good Times',                 emoji: '📸' },
    quiz:      { number: '04', title: 'How Well Do You Know Your Husband?', emoji: '🧐' },
    gifts:     { number: '05', title: 'Choose Your Birthday Gift',       emoji: '🎁' },
    game:      { number: '06', title: 'Pop The Balloons',                emoji: '🎈' },
    letter:    { number: '07', title: 'A Letter For You',                emoji: '💌' },
    finale:    { number: '08', title: 'One Last Thing…',                 emoji: '🎂' },
  },

  // -----------------------------------------------------------
  // Official Birthday Report card
  // -----------------------------------------------------------
  birthdayReport: [
    { field: 'Name',                       value: 'Neenu' },
    { field: 'Current Age',                value: 'CLASSIFIED 🔐' },
    { field: 'Birthday Status',            value: 'EXTREMELY SPECIAL ⭐⭐⭐⭐⭐' },
    { field: 'Cuteness Level',             value: 'UNREASONABLE' },
    { field: 'Patience with Husband',      value: 'UNDER INVESTIGATION' },
    { field: 'Ability to steal food',      value: '100%' },
    { field: 'Ability to control husband', value: '100%' },
    { field: 'Cake Requirement',           value: 'MANDATORY 🎂' },
  ],
  reportStamp: 'FILED WITH JOY · TODAY',

  // -----------------------------------------------------------
  // Things You Do (funny observations)
  // -----------------------------------------------------------
  thingsYouDo: [
    'Saying "I\'m ready" when you\'re definitely not ready.',
    'Taking forever to decide what to eat, then ordering what I suggested first.',
    'Stealing food from my plate — even after ordering your own.',
    'Saying "nothing" when there is very clearly something.',
    'Somehow knowing exactly when I\'m hiding something.',
    'Being cute on purpose and then pretending you had no idea.',
    'Saying "5 more minutes" and meaning 45.',
    'Winning every argument and then reminding me about it later. 😂',
  ],

  // -----------------------------------------------------------
  // Photo memories — playful captions
  // -----------------------------------------------------------
  memories: [
    { image: '/assets/photos/memory-01.jpg', title: 'Look at us. 😂',            date: 'once upon a time' },
    { image: '/assets/photos/memory-02.jpg', title: 'One of my favourites.',     date: 'that day' },
    { image: '/assets/photos/memory-03.jpg', title: 'We actually looked good.',  date: 'august 2021' },
    { image: '/assets/photos/memory-04.jpg', title: 'Proof that we go outside.', date: 'somewhere in Kerala' },
    { image: '/assets/photos/memory-05.jpg', title: 'Another day, another adventure.', date: 'a good trip' },
    { image: '/assets/photos/memory-06.jpg', title: 'Why do we look so serious? 😂', date: 'no idea' },
  ],

  // -----------------------------------------------------------
  // How Well Do You Know Your Husband? quiz
  // Each question: two options. correct is the index (0 or 1).
  // Set correct: null for opinion questions — any answer scores.
  // -----------------------------------------------------------
  quiz: [
    {
      question: 'Who is more likely to say "I\'m hungry"?',
      options: ['Husband', 'Wife'],
      correct: 0,
    },
    {
      question: 'Who takes longer to get ready?',
      options: ['Husband', 'Wife'],
      correct: 1,
    },
    {
      question: 'Who is more likely to steal food from the other person\'s plate?',
      options: ['Husband', 'Wife'],
      correct: 1,
    },
    {
      question: 'Who wins more arguments?',
      options: ['Husband (in his dreams)', 'Wife (always)'],
      correct: 1,
    },
    {
      question: 'Who says "I\'ll be there in 5 minutes" and lies?',
      options: ['Husband', 'Wife'],
      correct: 0,
    },
    {
      question: 'Who loves the other person more?',
      options: ['Obviously me 😎', 'Obviously you ❤️'],
      correct: null, // opinion — both are "correct"
    },
  ],

  quizResults: [
    { min: 0, message: 'Hmm. We should probably talk. 😂' },
    { min: 3, message: 'Not bad. You know me almost as well as I know your snack drawer.' },
    { min: 5, message: 'Certified expert on your husband. Congratulations. 🏆' },
  ],

  // -----------------------------------------------------------
  // Choose Your Birthday Gift
  // -----------------------------------------------------------
  gifts: [
    {
      label: 'Gift #1',
      title: 'The Emotional Support Package',
      message: 'Unlimited hugs. Redeemable any day. No expiry.',
    },
    {
      label: 'Gift #2',
      title: 'The Long-Term Investment',
      message: 'One husband, ready to annoy you for another whole year. 😂',
    },
    {
      label: 'Gift #3',
      title: 'The Obvious One',
      message: 'Cake. Obviously. 🎂',
    },
    {
      label: 'Secret Gift',
      title: 'The Best One',
      message:
        'You already have the best gift.\nME. 😎\n\nOkay okay, don\'t throw anything at the screen. 😂',
    },
  ],

  // -----------------------------------------------------------
  // Balloon game — surprise messages when you pop one
  // -----------------------------------------------------------
  balloonMessages: [
    'Pop! 🎉',
    'You\'re the best!',
    'Cake incoming 🎂',
    'One more!',
    'Wife > everyone',
    '❤',
    '🎈',
    'Look at you go!',
    'You\'re unstoppable',
  ],

  // -----------------------------------------------------------
  // Chapter 07 — the letter inside the Hogwarts-style envelope.
  // Keep it short and birthday-toned. Edit freely.
  // -----------------------------------------------------------
  birthdayLetter: `Neenu,

Jokes apart for a second.

There's a lot I could say today,
but mostly I just want you to know this —

you're my favourite person,
and I'm really glad you were born.

Have the best birthday ever.
And save me a slice of cake. 🎂❤`,

  // -----------------------------------------------------------
  // Final cake wish (revealed after the candle goes out)
  // -----------------------------------------------------------
  finalWish: `I hope you have an amazing year ahead.

Keep smiling.
Keep being crazy.
Keep being you.

And yes… you're stuck with me for another year. 😂❤

HAVE THE BEST BIRTHDAY EVER! 🎂🎉`,

  // -----------------------------------------------------------
  // Closing screen
  // -----------------------------------------------------------
  closingCaption: 'Happy Birthday, Neenu ❤',
  closingTagline: 'Now go eat your cake. 🎂😂',

  // -----------------------------------------------------------
  // Easter eggs — small hidden triggers scattered on the page
  // -----------------------------------------------------------
  easterEggs: [
    {
      trigger: '🤫 Don\'t click this.',
      reveal: 'You really don\'t listen, do you? 😂',
    },
    {
      trigger: '👀 Secret',
      reveal: 'Okay, fine. Happy Birthday again. ❤',
    },
    {
      trigger: '⚠️ Husband Settings',
      reveal: 'Status: Completely under wife\'s control. As it should be.',
    },
  ],
};
