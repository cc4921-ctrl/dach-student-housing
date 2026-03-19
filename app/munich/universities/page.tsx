const universities = [
  { name: "Ludwig-Maximilians-Universität (LMU)", total: "52,600", intl: "~9,300", pctIntl: "17%", founded: "1472", focus: "Germany's second-largest university — full-spectrum research across humanities, sciences, medicine, law" },
  { name: "Technical University of Munich (TUM)", total: "51,900", intl: "~23,000", pctIntl: "44%", founded: "1868", focus: "Top-ranked technical university — engineering, natural sciences, computer science, medicine" },
  { name: "Hochschule München (HM)", total: "18,000", intl: "~2,700", pctIntl: "15%", founded: "1971", focus: "University of applied sciences — engineering, business, design, social sciences" },
  { name: "Universität der Bundeswehr München", total: "3,500", intl: "~350", pctIntl: "10%", founded: "1973", focus: "Federal defence university — engineering, computer science, economics, social sciences" },
  { name: "Hochschule für Musik und Theater München", total: "1,200", intl: "~480", pctIntl: "40%", founded: "1846", focus: "Conservatory — music performance, conducting, theatre, music education" },
  { name: "Akademie der Bildenden Künste München", total: "750", intl: "~200", pctIntl: "27%", founded: "1808", focus: "Fine arts academy — painting, sculpture, art education, interior architecture" },
];

const totals = { students: "148,000+", intl: "~36,000", pctIntl: "~24%" };

export default function MunichUniversities() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Universities</h1>
          <p className="text-slate-500 mt-1">Munich &middot; {totals.students} students &middot; {totals.pctIntl} international</p>
        </div>
        <div className="space-y-4">
          {universities.map(u => (
            <div key={u.name} className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-800 text-lg">{u.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{u.focus}</p>
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-slate-400">Total Students</p>
                  <p className="text-xl font-bold text-slate-800">{u.total}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">International</p>
                  <p className="text-xl font-bold text-blue-600">{u.intl}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">% International</p>
                  <p className="text-xl font-bold text-slate-800">{u.pctIntl}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Founded</p>
                  <p className="text-xl font-bold text-slate-800">{u.founded}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
