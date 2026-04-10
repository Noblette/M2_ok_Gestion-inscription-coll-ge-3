import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInscriptions } from "../api/inscriptionsApi";  // ✅ UNIQUEMENT inscriptionsApi
import { getEleves } from "../api/elevesApi";             // ✅ Import séparé
import { getClasses } from "../api/classesApi";           // ✅ Import séparé
import { ArrowLeftIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

const UserInscriptionsList = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getInscriptions(),
      getEleves(),
      getClasses()
    ]).then(([insRes, elRes, clRes]) => {
      setInscriptions(insRes.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
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
            <ClipboardDocumentCheckIcon className="h-8 w-8" />
            <h2 className="text-3xl font-bold">Liste des inscriptions</h2>
          </div>
          <p className="mt-2 text-white/80 text-sm">Consultation en lecture seule</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Élève</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Classe</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Année</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Frais</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {inscriptions.length > 0 ? (
                  inscriptions.map(i => (
                    <tr key={i._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {i.eleve?.nom || 'N/A'} {i.eleve?.prenom || ''}
                      </td>
                      <td className="px-6 py-4 text-slate-800">
                        {i.classe?.nom || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {i.anneeScolaire || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                        {i.frais 
                          ? i.frais.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " Ar" 
                          : "-"
                        }
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {i.dateInscription 
                          ? new Date(i.dateInscription).toLocaleDateString("fr-FR") 
                          : "-"
                        }
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                      Aucune inscription trouvée.
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

export default UserInscriptionsList;  // ✅ CORRECT