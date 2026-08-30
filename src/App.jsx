import { useRef } from 'react';
import './App.css';
import { birthdayData } from './data/birthdayData.js';

import Hero from './components/Hero.jsx';
import BirthdayInvestigation from './components/BirthdayInvestigation.jsx';
import LoveReasons from './components/LoveReasons.jsx';
import Memories from './components/Memories.jsx';
import Timeline from './components/Timeline.jsx';
import RelationshipStats from './components/RelationshipStats.jsx';
import LoveGame from './components/LoveGame.jsx';
import LoveLetter from './components/LoveLetter.jsx';
import BirthdaySurprise from './components/BirthdaySurprise.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import EasterEgg from './components/EasterEgg.jsx';

export default function App() {
  const investigationRef = useRef(null);

  const scrollToInvestigation = () => {
    document
      .getElementById('investigation')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app">
      <Hero
        heroPhoto={birthdayData.heroPhoto}
        onContinue={scrollToInvestigation}
      />

      <BirthdayInvestigation
        caseFile={birthdayData.caseFile}
        evidence={birthdayData.evidence}
      />

      <LoveReasons reasons={birthdayData.reasons} />

      <Memories memories={birthdayData.memories} />

      <Timeline timeline={birthdayData.timeline} />

      <RelationshipStats stats={birthdayData.stats} />

      <LoveGame messages={birthdayData.heartMessages} />

      <EasterEgg />

      <LoveLetter
        loveLetter={birthdayData.loveLetter}
        wifeName={birthdayData.wifeName}
        husbandName={birthdayData.husbandName}
      />

      <BirthdaySurprise
        wifeName={birthdayData.wifeName}
        finalWish={birthdayData.finalWish}
      />

      <footer className="footer">
        Made with <span className="footer-heart">❤</span> just for you,{' '}
        {birthdayData.wifeName}.
      </footer>

      <MusicPlayer
        src={birthdayData.music}
        title={birthdayData.musicTitle}
      />
    </div>
  );
}
