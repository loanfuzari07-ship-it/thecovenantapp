"use client";

import { useState } from 'react';
import { FREQUENCIES, TEXTS } from '@/app/lib/content';
import { AlertTriangle, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CustomAudioPlayer } from '@/components/CustomAudioPlayer';

interface Angel {
  name: string;
  meaning: string;
  guardian: string;
  description: string;
  prayer: string;
}

const ANGELS: Angel[] = [
  {
    name: "Archangel Michael",
    meaning: "Who is like God",
    guardian: "Protection, courage and spiritual warfare",
    description: "Michael is the commander of the heavenly armies and the great protector of those who walk in faith. His assignment over your life means you are called to stand firm even when the battle is fierce. He walks beside you in every spiritual conflict and ensures that no weapon formed against your covenant shall prosper.",
    prayer: "Archangel Michael, commander of the celestial armies and guardian of my soul, I invoke your powerful protection over my life and my covenant today. Stand between me and every force that seeks to destroy what God has joined together. With your flaming sword of truth, sever every cord of deception, confusion and division that has entered my marriage. Cover my home with your shield of divine protection. Guide my husband back to the truth of his covenant and remind him of the sacred promise he made before God. I am not alone in this battle. You stand with me. In the name of Jesus, amen."
  },
  {
    name: "Archangel Gabriel",
    meaning: "God is my strength",
    guardian: "Communication, revelation and divine messages",
    description: "Gabriel is the messenger of God, the angel who carries divine revelation from heaven to earth. His presence over your life means you are someone through whom God speaks and through whom truth is revealed. In your marriage restoration journey, Gabriel works to open channels of true communication, to break the silence and to restore the words of love that have gone unspoken.",
    prayer: "Archangel Gabriel, holy messenger and revealer of divine truth, I ask for your intercession over the communication in my marriage. Open the lips that have been closed by pride and fear. Soften the words that come between us. Carry my prayers as messages to the throne of God and return with His answer written on my husband's heart. Let truth prevail over every deception. Let love speak louder than silence. Restore the conversation that built our covenant and let it begin again today. In the name of Jesus, amen."
  },
  {
    name: "Archangel Raphael",
    meaning: "God heals",
    guardian: "Healing, restoration and divine medicine",
    description: "Raphael is the great healer of heaven, the angel assigned to wounds of the body, soul and spirit. His presence over your life means that healing is your inheritance and that God has not forgotten the pain you carry. In your marriage, Raphael works to heal the wounds that both you and your husband carry, the ones that were there before you met and the ones created between you.",
    prayer: "Archangel Raphael, divine physician and healer of wounded hearts, touch my marriage with your healing grace today. Go to the places in my husband's heart that I cannot reach and bring the medicine of heaven. Heal the wounds that made him who he is, the old pain that has now become our pain. Heal the wounds between us with your gentle and powerful hand. Restore what sickness and sorrow have taken from our covenant. Let wholeness begin today. In the name of Jesus, amen."
  },
  {
    name: "Archangel Uriel",
    meaning: "God is my light",
    guardian: "Wisdom, clarity and divine illumination",
    description: "Uriel is the angel of divine light and wisdom, the one who illuminates the path when darkness has made it impossible to see. His presence over your life means you carry a capacity for wisdom and insight that is not natural but supernatural. In your marriage journey, Uriel brings clarity to confusion, light to deception and wisdom to moments of impossible decision.",
    prayer: "Archangel Uriel, torch of divine wisdom and light in every darkness, illuminate the path before my marriage today. Where I cannot see clearly, give me your sight. Where confusion has settled over my husband's heart like a fog, let your light pierce through it. Reveal to both of us the truth of what God intends for our covenant. Guide every conversation, every decision and every step toward the restoration that You have promised. Let wisdom lead where emotion cannot. In the name of Jesus, amen."
  },
  {
    name: "Archangel Chamuel",
    meaning: "One who seeks God",
    guardian: "Love, relationships and heart restoration",
    description: "Chamuel is the angel of unconditional love and the divine guardian of relationships. His assignment over your life means your heart was made for deep and lasting love and that God has not abandoned that design in your marriage. Chamuel works specifically in the realm of the heart, restoring what love has lost and reawakening what time and pain have buried.",
    prayer: "Archangel Chamuel, guardian of love and divine restorer of broken hearts, I invite your presence into the deepest chamber of my marriage today. Go to my husband's heart and remind it of what it felt the day he chose me. Reawaken the love that has grown cold. Restore the tenderness that has hardened. Plant new seeds of affection, desire and commitment in both our hearts. Let love that was buried rise again, stronger and more rooted than before. Our covenant was built on love. Let it be restored by love. In the name of Jesus, amen."
  },
  {
    name: "Archangel Zadkiel",
    meaning: "Righteousness of God",
    guardian: "Forgiveness, mercy and spiritual freedom",
    description: "Zadkiel is the angel of forgiveness and divine mercy, the celestial guardian of those who choose to release rather than hold on. His presence over your life means you carry a remarkable capacity for forgiveness even when it costs you greatly. In your marriage, Zadkiel works to dissolve the chains of unforgiveness that keep both partners trapped in the past.",
    prayer: "Archangel Zadkiel, minister of divine mercy and guardian of the forgiven heart, I ask for your intercession in my marriage today. Help me to truly forgive what I have not yet been able to release. Carry mercy to my husband's conscience and let it do the work that words cannot. Break every chain of bitterness, resentment and unforgiveness that has bound our covenant. Where there has been judgment let there be grace. Where there has been accusation let there be mercy. Let forgiveness be the foundation on which our restoration is built. In the name of Jesus, amen."
  },
  {
    name: "Archangel Jophiel",
    meaning: "Beauty of God",
    guardian: "Beauty, joy and the renewal of hope",
    description: "Jophiel is the angel of divine beauty and joy, the guardian who restores hope when circumstances have made everything feel gray and heavy. Her presence over your life means you were created to carry beauty into every space you enter including the space of your marriage. Jophiel works to renew your sense of hope, to restore the beauty of what your marriage was meant to be and to remind you that God has not finished painting your story.",
    prayer: "Archangel Jophiel, guardian of divine beauty and keeper of hope, breathe beauty back into my marriage today. Where ugliness has entered bring the beauty of truth. Where joy has left call it back. Where hope has grown faint let it burn bright again. Help me to see my husband through eyes of grace rather than eyes of pain. Help me to see my marriage as God sees it, not as it is today but as it is becoming in His hands. Let beauty have the final word. In the name of Jesus, amen."
  }
];

export function BonusTab() {
  const [expandedFrequency, setExpandedFrequency] = useState<number | null>(null);
  const [expandedText, setExpandedText] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalScreen, setModalScreen] = useState<'A' | 'B' | 'C'>('A');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [error, setError] = useState('');
  const [angel, setAngel] = useState<Angel | null>(null);
  const [copyStatus, setCopyStatus] = useState('Copy Prayer');

  const handleRevealAngel = () => {
    if (!birthDate) {
      setError('Please enter your birth date.');
      return;
    }
    setError('');
    setModalScreen('B');
    
    setTimeout(() => {
      const date = new Date(birthDate);
      const hour = parseInt(birthTime.split(':')[0]) || 12;
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      const index = (month + day + hour) % 7;
      setAngel(ANGELS[index]);
      setModalScreen('C');
    }, 2800);
  };

  const handleCopyPrayer = () => {
    if (angel) {
      navigator.clipboard.writeText(angel.prayer);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy Prayer'), 2000);
    }
  };

  const resetModal = () => {
    setModalScreen('A');
    setBirthDate('');
    setBirthTime('');
    setError('');
    setAngel(null);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8">
      <div className="mb-6">
        <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] mb-1 block">
          Bonus Content
        </span>
        <h2 className="font-lora text-[20px] md:text-[22px] font-semibold text-[var(--cream)] leading-tight mb-2">
          Your Complete Restoration Toolkit
        </h2>
        <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-relaxed">
          These bonuses are designed to complement your daily protocol and deepen your restoration journey.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
          <h3 className="font-lora text-[18px] md:text-[20px] font-semibold text-[var(--cream)]">
            Sacred Frequency Audio Series
          </h3>
        </div>
        <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-relaxed mb-4">
          Each frequency has been carefully selected for its association with specific areas of emotional and spiritual healing.
        </p>

        <div className="space-y-4">
          {FREQUENCIES.map((freq) => (
            <div key={freq.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[14px] md:rounded-[16px] overflow-hidden">
              <div 
                onClick={() => setExpandedFrequency(expandedFrequency === freq.id ? null : freq.id)}
                className="p-4 md:p-[18px_20px] flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--bg-surface)] border border-[var(--border-active)] px-3 py-1 rounded-full text-[11px] font-semibold text-[var(--gold)]">
                    {freq.value}
                  </div>
                  <h4 className="font-lora text-[15px] md:text-[17px] font-semibold text-[var(--cream)]">{freq.title}</h4>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-[var(--text-muted)] transition-transform", expandedFrequency === freq.id && "rotate-180")} />
              </div>
              
              {expandedFrequency === freq.id && (
                <div className="px-4 pb-4 md:px-[20px] md:pb-[20px] animate-in slide-in-from-top-2">
                  <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-relaxed mb-3">
                    {freq.description}
                  </p>
                  <div className="bg-[var(--bg-surface)] rounded-lg p-3 mb-4">
                    <span className="text-[10px] font-medium tracking-wider uppercase text-[var(--gold)] mb-1 block">How to use</span>
                    <p className="text-[12px] md:text-[13px] text-[var(--cream)] leading-relaxed">{freq.usage}</p>
                  </div>
                  
                  <CustomAudioPlayer 
                    src={`/frequencies/${freq.value.replace(' ', '').toUpperCase()}.MP3`}
                    title={`${freq.value} - ${freq.title}`}
                    artist="The Covenant App"
                    album="Sacred Frequency Audio Series"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-[var(--border)] mb-8" />

      <div>
        <h3 className="font-lora text-[18px] md:text-[20px] font-semibold text-[var(--cream)] mb-2">
          Three Texts That Reopen His Heart
        </h3>
        <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-relaxed mb-5">
          Carefully crafted invitations that create space for connection without pressure.
        </p>

        <div className="bg-[rgba(216,90,48,0.1)] border border-[rgba(216,90,48,0.3)] rounded-xl p-4 mb-6 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
          <p className="text-[13px] md:text-[14px] text-[var(--accent-light)] leading-relaxed">
            <strong>Important:</strong> Timing matters more than the words themselves.
          </p>
        </div>

        <div className="space-y-4">
          {TEXTS.map((text) => (
            <div key={text.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[14px] md:rounded-[16px] overflow-hidden">
              <div 
                onClick={() => setExpandedText(expandedText === text.id ? null : text.id)}
                className="p-4 md:p-[18px_20px] flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--bg-surface)] border border-[var(--border-active)] px-3 py-1 rounded-full text-[11px] font-semibold text-[var(--gold)]">
                    Text {text.id}
                  </div>
                  <h4 className="font-lora text-[15px] md:text-[17px] font-semibold text-[var(--cream)]">{text.title}</h4>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-[var(--text-muted)] transition-transform", expandedText === text.id && "rotate-180")} />
              </div>

              {expandedText === text.id && (
                <div className="px-4 pb-4 md:px-[20px] md:pb-[20px] animate-in slide-in-from-top-2 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase text-[var(--gold)] mb-1 block">When to send</span>
                    <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">{text.when}</p>
                  </div>
                  <div className="bg-[var(--bg-surface)] border-l-[3px] border-[var(--gold)] rounded-r-xl p-4">
                    <p className="font-lora text-[14px] italic text-[var(--cream)]">"{text.message}"</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[var(--gold)] mb-1 block">Why it works</span>
                    <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">{text.why}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[var(--accent)] mb-1 block">What not to do</span>
                    <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">{text.notToDo}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-[var(--border)] my-8" />

      <div>
        <h3 className="font-lora text-[18px] md:text-[20px] font-semibold text-[var(--cream)] mb-2">
          Discover Your Guardian Angel
        </h3>
        <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-relaxed mb-4">
          Your birth date and time hold a sacred significance in ancient spiritual traditions. Discover which celestial guardian has been assigned to watch over your life and your covenant and receive their specific prayer of protection.
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full p-[15px] bg-[#C9A96E] border-none rounded-[10px] text-[#1C1410] font-semibold font-lora transition-colors"
        >
          Discover My Guardian Angel
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 z-[1000] flex items-center justify-center p-5">
          <div className="bg-[var(--bg-card)] border border-[var(--border-active)] rounded-[20px] w-full max-w-[440px] max-h-[90vh] overflow-y-auto p-6 relative animate-in zoom-in-95 duration-200">
            {modalScreen === 'A' && (
              <>
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)]">
                  <X className="w-4 h-4" />
                </button>
                <div className="text-center mb-4 text-[var(--gold)] text-[32px]">✦</div>
                <h3 className="font-lora text-[20px] font-semibold text-[var(--cream)] text-center mb-1.5">Your Sacred Birth Profile</h3>
                <p className="text-[13px] text-[var(--text-secondary)] text-center leading-relaxed mb-6">Enter your birth date and time to reveal which angel has been guiding and protecting your covenant journey.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] uppercase text-[var(--gold)] block mb-1.5 font-medium">Date of Birth</label>
                    <input 
                      type="date" 
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full p-[13px_16px] bg-[var(--bg-surface)] border border-[var(--border)] rounded-[10px] text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
                    />
                    {error && <p className="text-[var(--accent)] text-[12px] mt-1">{error}</p>}
                  </div>
                  <div>
                    <label className="text-[11px] uppercase text-[var(--gold)] block mb-1.5 font-medium">Time of Birth</label>
                    <input 
                      type="time" 
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full p-[13px_16px] bg-[var(--bg-surface)] border border-[var(--border)] rounded-[10px] text-[var(--cream)] focus:border-[var(--gold)] focus:outline-none"
                    />
                    <p className="text-[11px] text-[var(--text-muted)] mt-1.5">Approximate time is fine. If unknown, enter 12:00.</p>
                  </div>
                  <button 
                    onClick={handleRevealAngel}
                    className="w-full p-[15px] bg-[#D85A30] text-white rounded-[10px] font-lora font-semibold text-[14px] mt-2 shadow-lg"
                  >
                    Reveal My Guardian Angel
                  </button>
                </div>
              </>
            )}

            {modalScreen === 'B' && (
              <div className="flex flex-col items-center justify-center py-10 min-h-[220px]">
                <div className="w-12 h-12 border-2 border-[rgba(201,169,110,0.2)] border-top-2 border-t-[var(--gold)] rounded-full animate-spin mb-5"></div>
                <p className="font-lora text-[16px] text-[var(--cream)] text-center mb-2">Reading the celestial patterns...</p>
                <p className="text-[13px] text-[var(--text-secondary)] text-center">Consulting the sacred calendar of your birth</p>
              </div>
            )}

            {modalScreen === 'C' && angel && (
              <div className="animate-in fade-in duration-500">
                <div className="bg-[var(--bg-surface)] rounded-[12px] p-5 text-center mb-5">
                  <span className="text-[10px] uppercase text-[var(--gold)] tracking-widest block mb-2">Your Guardian Angel</span>
                  <h3 className="font-lora text-[24px] font-semibold text-[var(--cream)] mb-1">{angel.name}</h3>
                  <p className="text-[12px] text-[var(--gold-light)] mb-2">Meaning: {angel.meaning}</p>
                  <div className="w-10 h-[1px] bg-[var(--gold)] mx-auto my-2 opacity-50"></div>
                  <p className="text-[12px] text-[var(--text-secondary)]">Guardian of {angel.guardian}</p>
                </div>
                
                <p className="text-[13px] text-[var(--text-secondary)] leading-[1.8] mb-5">{angel.description}</p>
                
                <span className="text-[11px] uppercase text-[var(--gold)] block mb-2.5 font-medium">Your Sacred Prayer</span>
                <div className="bg-[var(--bg-surface)] border-l-[3px] border-[var(--gold)] rounded-r-[12px] p-4 mb-4">
                  <p className="font-lora text-[13px] italic text-[var(--cream)] leading-[1.8]">{angel.prayer}</p>
                </div>

                <div className="flex gap-2.5">
                  <button 
                    onClick={() => { setIsModalOpen(false); resetModal(); }}
                    className="flex-1 p-[12px] bg-[#D85A30] border-none rounded-[10px] text-white font-semibold text-[13px]"
                  >
                    Complete
                  </button>
                  <button 
                    onClick={handleCopyPrayer}
                    className="flex-1 p-[12px] bg-[rgba(201,169,110,0.15)] border border-[#C9A96E] rounded-[10px] text-[#C9A96E] font-semibold text-[13px] transition-all"
                  >
                    {copyStatus}
                  </button>
                </div>
                
                <p className="text-[11px] text-[var(--text-muted)] text-center mt-3">The same birth date will always reveal the same guardian angel.</p>
                <button 
                  onClick={() => setModalScreen('A')}
                  className="w-full text-[11px] text-[var(--text-secondary)] text-center underline mt-1.5 cursor-pointer block"
                >
                  Try a different date
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
