import Link from "next/link";

const universities = [
  { name: "Goethe University Frankfurt", total: "48,000", intl: "~7,600", pctIntl: "16%", founded: "1914", focus: "Full research university — law, economics, social sciences, natural sciences, medicine, humanities" },
  { name: "Frankfurt University of Applied Sciences (UAS)", total: "15,000", intl: "~3,000", pctIntl: "19%", founded: "1971", focus: "University of applied sciences — engineering, architecture, IT, social work, business" },
  { name: "Frankfurt School of Finance & Management", total: "3,327", intl: "~1,000", pctIntl: "30%", founded: "1957", focus: "Private business school — finance, management, international business, data analytics" },
  { name: "Hochschule für Musik und Darstellende Kunst", total: "900", intl: "~380", pctIntl: "42%", founded: "1878", focus: "Conservatory — music, performing arts, directing, composition, music education" },
  { name: "Provadis School of International Management & Technology", total: "897", intl: "~130", pctIntl: "14%", founded: "2003", focus: "Practice-integrated degree programmes in business, IT, and chemical engineering" },
  { name: "accadis Hochschule Bad Homburg", total: "600", intl: "~160", pctIntl: "27%", founded: "1980", focus: "Private business school — international management, sports management, digital business" },
  { name: "Philosophisch-Theologische Hochschule Sankt Georgen", total: "350", intl: "~80", pctIntl: "23%", founded: "1926", focus: "Jesuit faculty — philosophy, theology, religious studies" },
  { name: "Städelschule (Staatliche Hochschule für Bildende Künste)", total: "200", intl: "~140", pctIntl: "70%", founded: "1817", focus: "Fine arts academy — painting, sculpture, architecture (highly selective)" },
];

const totals = { students: "69,000+", intl: "~12,500", pctIntl: "~18%" };

export default function FrankfurtUniversities() {
  return (
    <div className="min-h-screen bg-midnight">
      <div className="relative w-full h-56 overflow-hidden">
        <img src="/images/banners/frankfurt.jpg" alt="Frankfurt" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/frankfurt" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Frankfurt</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Universities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">Universities</h1>
          <p className="text-sm text-silver mt-2">{totals.students} students &middot; {totals.pctIntl} international &middot; 8 institutions</p>
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
