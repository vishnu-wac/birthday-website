import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import { birthdayData } from './data/birthdayData.js';

import Announcement from './components/Announcement.jsx';
import Hero from './components/Hero.jsx';
import BirthdayReport from './components/BirthdayReport.jsx';
import ThingsYouDo from './components/ThingsYouDo.jsx';
import Memories from './components/Memories.jsx';
import Quiz from './components/Quiz.jsx';
import Gifts from './components/Gifts.jsx';
import BalloonGame from './components/BalloonGame.jsx';
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

          <BalloonGame
            chapter={chapters.game}
            messages={birthdayData.balloonMessages}
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
