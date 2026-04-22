"use client";

import { useState, useEffect, useRef } from 'react';
import { usePersistence } from '@/hooks/usePersistence';
import { LoginView } from '@/components/LoginView';
import { LoadingView } from '@/components/LoadingView';
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
    deleteNote,
  } = usePersistence();

  const [activeTab, setActiveTab] = useState('home');
  const [isStartingUp, setIsStartingUp] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded) {
      if (isLoggedIn) {
        // Valid session detected, show loading for 1000ms
        const timer = setTimeout(() => setIsStartingUp(false), 1000);
        return () => clearTimeout(timer);
      } else {
        setIsStartingUp(false);
      }
    }
  }, [isLoaded, isLoggedIn]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoginTransition = (email: string) => {
    setIsLoggingIn(true);
    setTimeout(() => {
      login(email);
      setIsLoggingIn(false);
    }, 1800);
  };

  if (!isLoaded || isStartingUp || isLoggingIn) {
    return <LoadingView />;
  }

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLoginTransition} />;
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
            onDeleteNote={deleteNote}
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
