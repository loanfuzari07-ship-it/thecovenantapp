"use client";

import { useState, useEffect } from 'react';

export function usePersistence() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [protocolCompleted, setProtocolCompleted] = useState<number[]>([]);
  const [devotionalCompleted, setDevotionalCompleted] = useState<number[]>([]);
  const [notes, setNotes] = useState<Record<number, { text: string; timestamp: string }[]>>({});

  useEffect(() => {
    const loggedIn = localStorage.getItem('covenant_logged_in') === 'true';
    const expiry = localStorage.getItem('covenant_login_expiry');
    const storedEmail = localStorage.getItem('covenant_email') || '';
    const storedProtocol = JSON.parse(localStorage.getItem('covenant_protocol_completed') || '[]');
    const storedDevotionals = JSON.parse(localStorage.getItem('covenant_devotionals_completed') || '[]');
    const storedNotes = JSON.parse(localStorage.getItem('covenant_notes') || '{}');

    if (loggedIn && expiry && parseInt(expiry) > Date.now()) {
      setIsLoggedIn(true);
      setEmail(storedEmail);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem('covenant_logged_in');
    }

    setProtocolCompleted(storedProtocol);
    setDevotionalCompleted(storedDevotionals);
    setNotes(storedNotes);
    setIsLoaded(true);
  }, []);

  const login = (userEmail: string) => {
    const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem('covenant_logged_in', 'true');
    localStorage.setItem('covenant_email', userEmail);
    localStorage.setItem('covenant_login_expiry', expiry.toString());
    setIsLoggedIn(true);
    setEmail(userEmail);
  };

  const logout = () => {
    localStorage.removeItem('covenant_logged_in');
    localStorage.removeItem('covenant_email');
    localStorage.removeItem('covenant_login_expiry');
    setIsLoggedIn(false);
  };

  const toggleProtocol = (day: number) => {
    const updated = protocolCompleted.includes(day)
      ? protocolCompleted.filter(d => d !== day)
      : [...protocolCompleted, day];
    setProtocolCompleted(updated);
    localStorage.setItem('covenant_protocol_completed', JSON.stringify(updated));
  };

  const toggleDevotional = (day: number) => {
    const updated = devotionalCompleted.includes(day)
      ? devotionalCompleted.filter(d => d !== day)
      : [...devotionalCompleted, day];
    setDevotionalCompleted(updated);
    localStorage.setItem('covenant_devotionals_completed', JSON.stringify(updated));
  };

  const addNote = (day: number, text: string) => {
    const newNote = {
      text,
      timestamp: new Date().toLocaleString(),
    };
    const updated = {
      ...notes,
      [day]: [...(notes[day] || []), newNote],
    };
    setNotes(updated);
    localStorage.setItem('covenant_notes', JSON.stringify(updated));
  };

  const deleteNote = (day: number, index: number) => {
    const dayNotes = notes[day] || [];
    const updatedNotes = dayNotes.filter((_, i) => i !== index);
    const updated = {
      ...notes,
      [day]: updatedNotes,
    };
    setNotes(updated);
    localStorage.setItem('covenant_notes', JSON.stringify(updated));
  };

  return {
    isLoaded,
    isLoggedIn,
    email,
    protocolCompleted,
    devotionalCompleted,
    notes,
    login,
    logout,
    toggleProtocol,
    toggleDevotional,
    addNote,
    deleteNote,
  };
}
