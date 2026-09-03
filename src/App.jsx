import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import { birthdayData } from './data/birthdayData.js';

import Countdown from './components/Countdown.jsx';
import Announcement from './components/Announcement.jsx';
import Hero from './components/Hero.jsx';
import BirthdayReport from './components/BirthdayReport.jsx';
import ThingsYouDo from './components/ThingsYouDo.jsx';
import Memories from './components/Memories.jsx';
import Quiz from './components/Quiz.jsx';
import Gifts from './components/Gifts.jsx';
import ReasoningChallenge from './components/ReasoningChallenge.jsx';
import LoveLetter from './components/LoveLetter.jsx';
import BirthdaySurprise from './components/BirthdaySurprise.jsx';
import FinalPhoto from './components/FinalPhoto.jsx';
import EasterEgg from './components/EasterEgg.jsx';
import ProgressNav from './components/ProgressNav.jsx';
import BirthdayModeBadge from './components/BirthdayModeBadge.jsx';

const NAV_ITEMS = [
  { id: 'hero',           label: 'Start' },
  { id: 'report',         label: 'Ch. 01' },
  { id: 'things-you-do',  label: 'Ch. 02' },
  { id: 'memories',       label: 'Ch. 03' },
  { id: 'quiz',           label: 'Ch. 04' },
  { id: 'gifts',          label: 'Ch. 05' },
  { id: 'game',           label: 'Ch. 06' },
  { id: 'letter',         label: 'Ch. 07' },
  { id: 'surprise',       label: 'Ch. 08' },
  { id: 'final-photo',    label: '🎂' },
];

export default function App() {
  // Birthday-date gate. Before the target moment, show a countdown; once time
  // reaches it, the countdown auto-flips to the birthday site. Preview via
  // ?preview=1 in the URL, or by setting sessionStorage.bd-preview.
  const target = useMemo(
    () => new Date(birthdayData.birthdayDate),
    []
  );

  const previewMode =
    typeof window !== 'undefined' &&
    (new URLSearchParams(window.location.search).get('preview') === '1' ||
      sessionStorage.getItem('bd-preview') === '1');

  const [revealed, setRevealed] = useState(
    () => previewMode || Date.now() >= target.getTime()
  );

  // Persist the preview override for the rest of this browser tab session so
  // the page doesn't slam back to the countdown on a refresh mid-editing.
  if (previewMode) {
    try { sessionStorage.setItem('bd-preview', '1'); } catch {}
  }

  // Skip the announcement on subsequent visits within the same tab — nice
  // during editing so you don't sit through it every reload.
  const initialEntered =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('bd-entered') === '1';
  const [entered, setEntered] = useState(initialEntered);

  const enter = () => {
    try { sessionStorage.setItem('bd-entered', '1'); } catch {}
    setEntered(true);
  };

  const { chapters, easterEggs = [] } = birthdayData;

  // Keep the browser tab title neutral until the reveal. Once the birthday
  // arrives (or preview mode is on), swap to the happy-birthday title.
  useEffect(() => {
    document.title = revealed
      ? `Happy Birthday, ${birthdayData.wifeName} 🎂❤`
      : 'Save the Date 🎂';
  }, [revealed]);

  if (!revealed) {
    return (
      <div className="app">
        <Countdown
          target={target}
          wifeName={birthdayData.wifeName}
          birthdayLabel={birthdayData.birthdayLabel}
          onDone={() => setRevealed(true)}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {!entered && (
          <Announcement
            key="announce"
            wifeName={birthdayData.wifeName}
            onEnter={enter}
          />
        )}
      </AnimatePresence>

      {entered && (
        <>
          <BirthdayModeBadge />
          <ProgressNav items={NAV_ITEMS} />

          <Hero
            heroPhoto={birthdayData.heroPhoto}
            wifeName={birthdayData.wifeName}
          />

          <BirthdayReport
            chapter={chapters.report}
            report={birthdayData.birthdayReport}
            stamp={birthdayData.reportStamp}
          />

          <ThingsYouDo
            chapter={chapters.thingsYouDo}
            items={birthdayData.thingsYouDo}
          />

          {/* First hidden Easter egg between "Things You Do" and the photos */}
          {easterEggs[0] && (
            <EasterEgg
              trigger={easterEggs[0].trigger}
              reveal={easterEggs[0].reveal}
              align="left"
            />
          )}

          <Memories
            chapter={chapters.memories}
            memories={birthdayData.memories}
          />

          <Quiz
            chapter={chapters.quiz}
            quiz={birthdayData.quiz}
            results={birthdayData.quizResults}
          />

          <Gifts
            chapter={chapters.gifts}
            gifts={birthdayData.gifts}
          />

          {/* Second hidden Easter egg between gifts and the game */}
          {easterEggs[1] && (
            <EasterEgg
              trigger={easterEggs[1].trigger}
              reveal={easterEggs[1].reveal}
              align="right"
            />
          )}

          <ReasoningChallenge
            chapter={chapters.game}
            questions={birthdayData.reasoning}
            prize={birthdayData.prize}
          />

          <LoveLetter
            chapter={chapters.letter}
            letter={birthdayData.birthdayLetter}
            husbandName={birthdayData.husbandName}
            wifeName={birthdayData.wifeName}
          />

          <BirthdaySurprise
            wifeName={birthdayData.wifeName}
            finalWish={birthdayData.finalWish}
          />

          {/* Third hidden Easter egg — quiet corner just before the closing photo */}
          {easterEggs[2] && (
            <EasterEgg
              trigger={easterEggs[2].trigger}
              reveal={easterEggs[2].reveal}
              align="center"
            />
          )}

          <FinalPhoto
            photo={birthdayData.finalPhoto}
            fallbackPhoto={birthdayData.heroPhoto}
            caption={birthdayData.closingCaption}
            tagline={birthdayData.closingTagline}
          />

          <footer className="footer">
            Made with <span className="footer-heart">❤</span> just for you,{' '}
            {birthdayData.wifeName}.
          </footer>
        </>
      )}
    </div>
  );
}
