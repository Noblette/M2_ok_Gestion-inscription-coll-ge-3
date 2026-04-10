import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getClasses } from "../api/classesApi";
import { ArrowLeftIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

const UserClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClasses().then(res => {
      setClasses(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/user" className="inline-flex items-center gap-2 mb-6 rounded-xl bg-white px-4 py-2 shadow-md hover:shadow-lg">
          <ArrowLeftIcon className="h-5 w-5" /> Retour dashboard
        </Link>

        <div className="rounded-3xl bg-[oklch(0.373_0.034_259.733)] px-6 py-8 text-white shadow-xl mb-8">
          <div className="flex items-center gap-3">
            <AcademicCapIcon className="h-8 w-8" />
            <h2 className="text-3xl font-bold">Liste des classes</h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Niveau</th>
                  {/* <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Niveau</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {classes.map(c => (
                  <tr key={c._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">{c.nom}</td>
                    {/* <td className="px-6 py-4 text-sm text-slate-600">{c.niveau || '-'}</td> */}
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

export default UserClassesList;