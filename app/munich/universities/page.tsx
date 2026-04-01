import Link from "next/link";

const universities = [
  { name: "Ludwig-Maximilians-Universität (LMU)", total: "52,658", intl: "~11,658", pctIntl: "22%", founded: "1472", focus: "Germany's second-largest university — full-spectrum research across humanities, sciences, medicine, law" },
  { name: "Technical University of Munich (TUM)", total: "51,954", intl: "~23,300", pctIntl: "45%", founded: "1868", focus: "Top-ranked technical university — engineering, natural sciences, computer science, medicine" },
  { name: "Hochschule München (HM)", total: "18,000", intl: "~2,500", pctIntl: "14%", founded: "1971", focus: "University of applied sciences — engineering, business, design, social sciences" },
  { name: "Universität der Bundeswehr München", total: "3,500", intl: "~280", pctIntl: "8%", founded: "1973", focus: "Federal defence university — engineering, computer science, economics, social sciences" },
  { name: "Hochschule für Musik und Theater München", total: "1,400", intl: "~560", pctIntl: "40%", founded: "1846", focus: "Conservatory — music performance, conducting, theatre, music education" },
  { name: "Akademie der Bildenden Künste München", total: "800", intl: "~200", pctIntl: "25%", founded: "1808", focus: "Fine arts academy — painting, sculpture, art education, interior architecture" },
  { name: "Hochschule für Fernsehen und Film (HFF)", total: "350", intl: "~70", pctIntl: "20%", founded: "1966", focus: "Film school — film directing, screenwriting, documentary, production, cinematography" },
];

const totals = { students: "129,000+", intl: "~38,600", pctIntl: "~30%" };

export default function MunichUniversities() {
  return (
    <div className="min-h-screen bg-midnight">
      <div className="relative w-full h-56 overflow-hidden">
        <img src="/images/banners/munich.jpg" alt="Munich" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/munich" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Munich</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Universities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">Universities</h1>
          <p className="text-sm text-silver mt-2">{totals.students} students &middot; {totals.pctIntl} international &middot; 7 institutions</p>
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
