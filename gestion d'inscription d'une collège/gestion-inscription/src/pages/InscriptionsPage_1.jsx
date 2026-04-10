import { useEffect, useState } from "react";
import { getInscriptions, createInscription, deleteInscription } from "../api/inscriptionsApi";
import { getEleves } from "../api/elevesApi";
import { getClasses } from "../api/classesApi";

const InscriptionsPage = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [eleves, setEleves] = useState([]);
  const [classes, setClasses] = useState([]);

  const [eleveId, setEleveId] = useState("");
  const [classeId, setClasseId] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const insRes = await getInscriptions();
    const elRes = await getEleves();
    const clRes = await getClasses();

    setInscriptions(insRes.data);
    setEleves(elRes.data);
    setClasses(clRes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createInscription({ eleve: eleveId, classe: classeId });

    setEleveId("");
    setClasseId("");

    load();
  };

  const handleDelete = async (id) => {
    await deleteInscription(id);
    load();
  };

  return (
    <div>
      <h2>📝 Gestion des inscriptions</h2>

      <form onSubmit={handleSubmit}>
        
        <select value={eleveId} onChange={(e) => setEleveId(e.target.value)}>
          <option value="">-- Choisir un élève --</option>
          {eleves.map(e => (
            <option key={e._id} value={e._id}>
              {e.nom} {e.prenom}
            </option>
          ))}
        </select>

        <select value={classeId} onChange={(e) => setClasseId(e.target.value)}>
          <option value="">-- Choisir une classe --</option>
          {classes.map(c => (
            <option key={c._id} value={c._id}>
              {c.nom}
            </option>
          ))}
        </select>

        <button type="submit">Ajouter inscription</button>
      </form>

      <ul>
        {inscriptions.map((i) => (
          <li key={i._id}>
            📘 {i.classe?.nom} — 🧑‍🎓 {i.eleve?.nom} {i.eleve?.prenom}

            <button onClick={() => handleDelete(i._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default InscriptionsPage;
//à améliorer