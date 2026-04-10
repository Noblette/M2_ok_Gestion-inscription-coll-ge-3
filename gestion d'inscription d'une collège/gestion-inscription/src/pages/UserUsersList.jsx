import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api/usersApi";
import { ArrowLeftIcon, UsersIcon } from "@heroicons/react/24/outline";

const UserUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* useEffect(() => {
    getUsers().then(res => {
      setUsers(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []); */
  useEffect(() => {
  console.log("🔍 DEBUG - Début chargement users...");
  
  getUsers()
    .then(res => {
      console.log("✅ Réponse complète:", res);
      console.log("✅ Users data:", res.data);
      setUsers(res.data || []);
      setLoading(false);
    })
    .catch(err => {
      console.error("❌ ERREUR getUsers:", err);
      console.error("❌ Status:", err.response?.status);
      console.error("❌ Message:", err.response?.data?.message);
      setLoading(false);
    });
}, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Chargement...</div>;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/user" className="inline-flex items-center gap-2 mb-6 rounded-xl bg-white px-4 py-2 shadow-md hover:shadow-lg transition-all">
          <ArrowLeftIcon className="h-5 w-5" /> Retour dashboard
        </Link>

        <div className="rounded-3xl bg-[oklch(0.373_0.034_259.733)] px-6 py-8 text-white shadow-xl mb-8">
          <div className="flex items-center gap-3">
            <UsersIcon className="h-8 w-8" />
            <h2 className="text-3xl font-bold">Liste des utilisateurs</h2>
          </div>
          <p className="mt-2 text-white/80 text-sm">Consultation en lecture seule</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Nom</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Rôle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {users.length > 0 ? (
                  users.map(u => (
                    <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">{u.nom}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          u.role === "admin" 
                            ? "bg-[oklch(0.373_0.034_259.733)] text-white" 
                            : "bg-emerald-100 text-emerald-800"
                        }`}>
                          {u.role === "admin" ? "👨‍💼 Admin" : "👤 User"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-slate-500">
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUsersList;