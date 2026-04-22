export function AppHeader() {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] md:max-w-[600px] h-[56px] md:h-[64px] bg-[var(--bg-primary)] border-b border-[var(--border)] flex items-center justify-center z-[100]">
      <h1 className="font-lora text-[17px] md:text-[19px] font-semibold text-[var(--gold)]">
        The Covenant App
      </h1>
    </header>
  );
}