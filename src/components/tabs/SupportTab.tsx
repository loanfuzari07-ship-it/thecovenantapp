"use client";

import { Mail, Clock, ShieldCheck } from 'lucide-react';

export function SupportTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8">
      <div className="mb-6">
        <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] mb-1 block">
          Support
        </span>
        <h2 className="font-lora text-[20px] font-semibold text-[var(--cream)] leading-tight mb-6">
          We're Here For You.
        </h2>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[14px] p-5 mb-6">
        <h3 className="font-lora text-[18px] font-semibold text-[var(--cream)] mb-2">Need Help?</h3>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-5">
          Our support team is ready to assist you with any questions or technical issues.
        </p>

        <div className="space-y-4">
          <div className="flex gap-3 pb-4 border-b border-[var(--border)]">
            <div className="w-9 h-9 rounded-full bg-[var(--bg-surface)] flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <div>
              <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] block mb-0.5">Email Support</span>
              <span className="text-[13px] text-[var(--cream)]">lanovdigital@gmail.com</span>
            </div>
          </div>

          <div className="flex gap-3 pb-4 border-b border-[var(--border)]">
            <div className="w-9 h-9 rounded-full bg-[var(--bg-surface)] flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <div>
              <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] block mb-0.5">Support Hours</span>
              <span className="text-[13px] text-[var(--cream)]">Monday through Friday, 9:00 AM to 6:00 PM EST</span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-[var(--bg-surface)] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <div>
              <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] block mb-0.5">Response Time</span>
              <span className="text-[13px] text-[var(--cream)]">Typically within 24 hours on business days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] mb-4">We Can Help With</h4>
        <ul className="space-y-3">
          {[
            "Technical issues accessing your materials",
            "Questions about the program content",
            "Guidance on spiritual practices",
            "Account and access issues",
            "Audio playback and download problems",
            "General inquiries and support"
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-[13px] text-[var(--text-secondary)] leading-normal">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="mailto:lanovdigital@gmail.com?subject=Covenant App Support Request"
        className="block w-full py-[15px] bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-center font-semibold rounded-xl text-[14px] transition-colors"
      >
        Contact Support Team
      </a>
    </div>
  );
}
