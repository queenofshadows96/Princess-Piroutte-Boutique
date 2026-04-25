export default function AdminOrdersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7fb] via-[#ffeef7] to-[#fbe9ff] text-[#2b1b2f] relative overflow-hidden">
      {/* Floating glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[radial-gradient(circle_at_center,_#f9d6ff,_transparent)]" />
        <div className="absolute top-20 right-0 w-56 h-56 bg-[radial-gradient(circle_at_center,_#ffe6cc,_transparent)]" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-[radial-gradient(circle_at_center,_#fdddf5,_transparent)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif tracking-wide text-[#3b243f]">
              Admin Orders Dashboard
            </h1>
            <p className="mt-2 text-sm md:text-base text-[#6b4a6f]">
              This is your luxury back office for Princess Pirouette Boutique.
            </p>
          </div>
          <div className="px-4 py-2 rounded-full border border-[#d4af37]/60 bg-white/70 shadow-sm text-xs md:text-sm text-[#7a5a2f] font-semibold tracking-wide">
            Princess Pirouette Boutique
          </div>
        </header>

        <div className="bg-white/80 backdrop-blur-sm border border-[#f3d9ff] rounded-2xl shadow-[0_18px_45px_rgba(123,63,148,0.18)] p-6">
          <p className="text-sm md:text-base text-[#4b304f]">
            Orders table will appear here next. For now, this confirms that
            <span className="font-semibold"> /admin/orders </span>
            is working.
          </p>
        </div>
      </div>
    </div>
  );
}
