"use client";

import { useState, useEffect, useRef } from 'react';
import { usePersistence } from '@/hooks/usePersistence';
import { LoginView } from '@/components/LoginView';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { HomeTab } from '@/components/tabs/HomeTab';
import { ProtocolTab } from '@/components/tabs/ProtocolTab';
import { DevotionalsTab } from '@/components/tabs/DevotionalsTab';
import { BonusTab } from '@/components/tabs/BonusTab';
import { SupportTab } from '@/components/tabs/SupportTab';

export default function Home() {
  const {
    isLoaded,
    isLoggedIn,
    protocolCompleted,
    devotionalCompleted,
    notes,
    login,
    toggleProtocol,
    toggleDevotional,
    addNote,
  } = usePersistence();

  const [activeTab, setActiveTab] = useState('home');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isLoaded) return <div className="min-h-screen bg-[var(--bg-primary)]" />;

  if (!isLoggedIn) {
    return <LoginView onLogin={login} />;
  }

  return (
    <div className="flex flex-col h-svh overflow-hidden relative max-w-[480px] md:max-w-[600px] mx-auto bg-[var(--bg-primary)] lg:shadow-[calc(-1px)_0_0_rgba(201,169,110,0.08),1px_0_0_rgba(201,169,110,0.08)]">
      <AppHeader />
      
      <main 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto mt-[56px] md:mt-[64px] mb-[64px] md:mb-[72px] px-5 md:px-[28px] pt-5 md:pt-[28px] pb-6 md:pb-[32px] bg-[var(--bg-primary)] view-transition"
      >
        {activeTab === 'home' && (
          <HomeTab
            protocolCompleted={protocolCompleted}
            devotionalCompleted={devotionalCompleted}
            devotionalNotes={notes}
            onTabChange={handleTabChange}
          />
        )}
        {activeTab === 'protocol' && (
          <ProtocolTab
            completed={protocolCompleted}
            onToggle={toggleProtocol}
          />
        )}
        {activeTab === 'devotionals' && (
          <DevotionalsTab
            completed={devotionalCompleted}
            onToggle={toggleDevotional}
            notes={notes}
            onAddNote={addNote}
          />
        )}
        {activeTab === 'bonus' && (
          <BonusTab />
        )}
        {activeTab === 'support' && (
          <SupportTab />
        )}
      </main>

      <AppFooter activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}