const universities = [
  { name: "University of Innsbruck (Leopold-Franzens-Universität)", total: "28,000", intl: "~5,600", pctIntl: "20%", founded: "1669", focus: "Full-spectrum research university — law, medicine, humanities, sciences, engineering" },
  { name: "Medical University of Innsbruck", total: "3,500", intl: "~700", pctIntl: "20%", founded: "2004", focus: "Dedicated medical sciences — human medicine, dentistry, molecular medicine" },
  { name: "MCI | The Entrepreneurial School", total: "3,400", intl: "~850", pctIntl: "25%", founded: "1995 / 2012 (university status)", focus: "Business, engineering, health sciences, tourism — strong industry partnerships" },
  { name: "Private University UMIT TIROL", total: "1,500", intl: "~225", pctIntl: "15%", founded: "2001", focus: "Health informatics, mechatronics, health sciences, psychology" },
];

const totals = { students: "36,400+", intl: "~7,375", pctIntl: "~20%" };

export default function InnsbruckUniversities() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Universities</h1>
          <p className="text-slate-500 mt-1">Innsbruck &middot; {totals.students} students &middot; {totals.pctIntl} international</p>
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
