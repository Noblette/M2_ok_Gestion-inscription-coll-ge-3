import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEleves } from "../api/elevesApi";
import { ArrowLeftIcon, UsersIcon } from "@heroicons/react/24/outline";

const UserElevesList = () => {
  const [eleves, setEleves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEleves().then(res => {
      setEleves(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/user" className="inline-flex items-center gap-2 mb-6 rounded-xl bg-white px-4 py-2 shadow-md">
          <ArrowLeftIcon className="h-5 w-5" /> Retour dashboard
        </Link>

        <div className="rounded-3xl bg-[oklch(0.373_0.034_259.733)] px-6 py-8 text-white shadow-xl mb-8">
          <div className="flex items-center gap-3">
            <UsersIcon className="h-8 w-8" />
            <h2 className="text-3xl font-bold">Liste des élèves</h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Nom</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Prénom</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Sexe</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Adresse</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Date de naissance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {eleves.map(e => (
                  <tr key={e._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">{e.nom}</td>
                    <td className="px-6 py-4 text-slate-800">{e.prenom}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        e.sexe === "M" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
                      }`}>
                        {e.sexe === "M" ? "M" : "F"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {e.adresse}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {/* {e.dateNaissance ? new Date(e.dateNaissance).getFullYear() : "-"} */}
                      {e.dateNaissance 
                          ? new Date(e.dateNaissance).toLocaleDateString("fr-FR") 
                          : "-"
                        }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserElevesList;