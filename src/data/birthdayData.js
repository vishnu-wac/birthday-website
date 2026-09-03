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
    game:      { number: '06', title: 'The Reasoning Challenge',         emoji: '🧠' },
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
    'Finding out what I\'m hiding — even when I\'m convinced I\'ve hidden it perfectly. 😏',
    'Somehow knowing when I\'m lying, even before I finish my sentence. 👀',
    'Turning into the cutest little baby the moment I get angry at you. 🥺',
    'Being just a tiny bit possessive… because apparently I\'m exclusively yours. ❤️',
    'Always being ready for one more outing — especially if there\'s good food involved. 🍕🍔',
    'If you\'re sleepy, suddenly I\'m supposed to be sleepy too. No negotiations. 😴',
    '10 PM means phone-off time. If I\'m still scrolling, someone is definitely getting angry. 📱😂',
    'Making rules for me that somehow become impossible to argue with because you\'re just too cute. 🥹❤️',
  ],

  // -----------------------------------------------------------
  // Photo memories — playful captions
  // -----------------------------------------------------------
  memories: [
    {
      image: '/assets/photos/memory-01.jpg',
      title: 'That smile behind me. 🥺',
      date: 'a lazy day at home',
      caption: 'You sneaking into every one of my selfies. Best sneaking of my life.',
    },
    {
      image: '/assets/photos/memory-02.jpg',
      title: 'Rare occasion — we cleaned up. 😎',
      date: 'a nice evening',
      caption: 'Look at us actually looking presentable. This does not happen often.',
    },
    {
      image: '/assets/photos/memory-03.jpg',
      title: 'Somewhere between laughing and posing. 😂',
      date: 'just another day',
      caption: 'Black-and-white. Big grins. My favourite genre of picture with you.',
    },
    {
      image: '/assets/photos/memory-04.jpg',
      title: 'The day we officially got stuck with each other. ❤',
      date: 'August 2021',
      caption: 'The garlands, the gold, the whole thing. Still the best day of my life.',
    },
    {
      image: '/assets/photos/memory-05.jpg',
      title: 'Kasavu saree, green everywhere. 🌿',
      date: 'a quiet Kerala day',
      caption: 'You in kasavu, all this green around us — one of those quiet days I want to keep.',
    },
    {
      image: '/assets/photos/memory-06.jpg',
      title: 'Full traditional mode. 😂',
      date: 'family function',
      caption: 'You posed. I squinted. The mango tree tried its best. Perfect.',
    },
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
      correct: 1,
    },
    {
      question: 'Who is more likely to start a quarrel?',
      options: ['Husband', 'Wife'],
      correct: 1,
    },
    {
      question: 'Who is more likely to say "I\'m sorry" first after a quarrel?',
      options: ['Husband', 'Wife'],
      correct: 0,
    },
    {
      question: 'Who is more likely to spend their free time reading books?',
      options: ['Husband', 'Wife'],
      correct: 0,
    },
    {
      question: 'Who is more likely to proudly say "The bookshelf is mine"?',
      options: ['Husband', 'Wife'],
      correct: 1,
    },
    {
      question: 'Who is more likely to turn into a cute little baby when the other one gets angry? 🥺',
      options: ['Husband', 'Wife'],
      correct: 1,
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
  // Reasoning Challenge (Chapter 06) — 3 easy bank-exam style
  // questions. Solve all three → the Amazon voucher is revealed.
  // -----------------------------------------------------------
  reasoning: [
    {
      prompt: 'Number Series — what comes next?',
      question: '2 · 3 · 5 · 8 · 13 · ?',
      options: ['18', '20', '21', '24'],
      correct: 2,
      hint: 'Each number is the sum of the previous two.',
    },
    {
      prompt: 'Coding — if A = 1, B = 2, C = 3 …',
      question: 'What is the sum of the letters in the word LOVE?',
      options: ['46', '50', '52', '54'],
      correct: 3,
      hint: 'L = 12, O = 15, V = 22, E = 5.',
    },
    {
      prompt: 'Direction Sense —',
      question:
        'A person walks 4 km East, then turns North and walks 3 km. What is the shortest distance from the starting point?',
      options: ['3 km', '4 km', '5 km', '7 km'],
      correct: 2,
      hint: 'Draw the path — it forms a right-angled triangle.',
    },
  ],

  // Image shown on the winning screen after all 3 questions are solved.
  prize: {
    image: '/assets/photos/voucher.jpg',
    heading: '🎁 You cracked it!',
    subline:
      'A tiny reward for the smartest girl I know. Go buy yourself something nice.',
    caption:
      'Amazon voucher — screenshot this or ask your husband for the code. 😉',
  },

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
