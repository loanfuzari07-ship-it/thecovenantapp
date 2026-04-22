"use client";

import { Mail, Clock, ShieldCheck } from 'lucide-react';

export function SupportTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8">
      <div className="mb-6">
        <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] mb-1 block">
          Support
        </span>
        <h2 className="font-lora text-[20px] md:text-[22px] font-semibold text-[var(--cream)] leading-tight mb-6">
          We're Here For You.
        </h2>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[14px] md:rounded-[16px] p-5 md:p-[24px] mb-6">
        <h3 className="font-lora text-[18px] md:text-[20px] font-semibold text-[var(--cream)] mb-2">Need Help?</h3>
        <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-relaxed mb-5">
          Our support team is ready to assist you with any questions or technical issues.
        </p>

        <div className="space-y-4">
          <div className="flex gap-3 pb-4 border-b border-[var(--border)]">
            <div className="w-9 h-9 rounded-full bg-[var(--bg-surface)] flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <div>
              <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] block mb-0.5">Email Support</span>
              <span className="text-[13px] md:text-[14px] text-[var(--cream)]">lanovdigital@gmail.com</span>
            </div>
          </div>

          <div className="flex gap-3 pb-4 border-b border-[var(--border)]">
            <div className="w-9 h-9 rounded-full bg-[var(--bg-surface)] flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <div>
              <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] block mb-0.5">Support Hours</span>
              <span className="text-[13px] md:text-[14px] text-[var(--cream)]">Mon-Fri, 9:00 AM to 6:00 PM EST</span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-[var(--bg-surface)] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <div>
              <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--gold)] block mb-0.5">Response Time</span>
              <span className="text-[13px] md:text-[14px] text-[var(--cream)] block">Typically within 24 hours</span>
              <span className="text-[11px] text-[var(--text-muted)]">(Business days only)</span>
            </div>
          </div>
        </div>
      </div>

      <a
        href="mailto:lanovdigital@gmail.com?subject=Covenant App Support Request"
        className="block w-full py-[15px] md:py-[18px] bg-[#C9A96E] text-[#1C1410] text-center font-bold rounded-xl text-[14px] md:text-[15px] transition-colors shadow-lg"
      >
        Contact Support Team
      </a>
    </div>
  );
}
