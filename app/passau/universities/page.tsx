import Link from "next/link";

const universities = [
  { name: "University of Passau (Universität Passau)", total: "10,568", intl: "1,916", pctIntl: "18%", founded: "1978", focus: "Compact research university — law, business, computer science, humanities, cultural studies. Known for strong law and business faculties with international focus." },
];

export default function PassauUniversities() {
  return (
    <div className="min-h-screen bg-midnight">
      <div className="relative w-full h-56 overflow-hidden">
        <img src="/images/banners/passau.jpg" alt="Passau" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/passau" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Passau</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Universities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">Universities</h1>
          <p className="text-sm text-silver mt-2">10,568 students &middot; 18% international &middot; 1 institution</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-4">
        {universities.map(u => (
          <div key={u.name} className="bg-midnight-light rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 p-6">
            <h3 className="font-bold text-snow text-lg">{u.name}</h3>
            <p className="text-sm text-silver mt-1.5">{u.focus}</p>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">Total Students</p>
                <p className="text-xl font-bold text-snow font-serif">{u.total}</p>
              </div>
              <div>
                <p className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">International</p>
                <p className="text-xl font-bold text-emerald-accent font-serif">{u.intl}</p>
              </div>
              <div>
                <p className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">% International</p>
                <p className="text-xl font-bold text-snow font-serif">{u.pctIntl}</p>
              </div>
              <div>
                <p className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">Founded</p>
                <p className="text-xl font-bold text-snow font-serif">{u.founded}</p>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
