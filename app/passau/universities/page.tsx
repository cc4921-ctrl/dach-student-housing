const universities = [
  { name: "University of Passau (Universität Passau)", total: "10,568", intl: "1,916", pctIntl: "18%", founded: "1978", focus: "Compact research university — law, business, computer science, humanities, cultural studies. Known for strong law and business faculties with international focus." },
];

export default function PassauUniversities() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Universities</h1>
          <p className="text-slate-500 mt-1">Passau &middot; 10,568 students &middot; 18% international</p>
        </div>
        <div className="space-y-4">
          {universities.map(u => (
            <div key={u.name} className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-800 text-lg">{u.name}</h3>
              <p className="text-sm text-slate-500 mt-2">{u.focus}</p>
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
