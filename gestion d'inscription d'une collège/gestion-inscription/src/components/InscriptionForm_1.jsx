import { useEffect, useState } from "react";
import api from "../api/axios";

const InscriptionForm = ({ initialData = null, onSuccess }) => {
  const [eleveId, setEleveId] = useState("");
  const [classeId, setClasseId] = useState("");
  const [annee, setAnnee] = useState("");

  const [eleves, setEleves] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const resEleves = await api.get("/eleves");
      const resClasses = await api.get("/classes");

      setEleves(resEleves.data);
      setClasses(resClasses.data);
    };
    loadData();

    if (initialData) {
      setEleveId(initialData.eleveId);
      setClasseId(initialData.classeId);
      setAnnee(initialData.annee);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { eleveId, classeId, annee };

      if (initialData) {
        await api.put(`/inscriptions/${initialData._id}`, payload);
      } else {
        await api.post("/inscriptions", payload);
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialData ? "Modifier Inscription" : "Nouvelle Inscription"}</h3>

      <label>Élève :</label>
      <select
        value={eleveId}
        onChange={(e) => setEleveId(e.target.value)}
        required
      >
        <option value="">Sélectionner...</option>
        {eleves.map((e) => (
          <option key={e._id} value={e._id}>
            {e.nom} {e.prenom}
          </option>
        ))}
      </select>

      <label>Classe :</label>
      <select
        value={classeId}
        onChange={(e) => setClasseId(e.target.value)}
        required
      >
        <option value="">Sélectionner...</option>
        {classes.map((c) => (
          <option key={c._id} value={c._id}>
            {c.nom}
          </option>
        ))}
      </select>

      <label>Année scolaire :</label>
      <input
        type="text"
        placeholder="2024-2025"
        value={annee}
        onChange={(e) => setAnnee(e.target.value)}
        required
      />

      <button type="submit">{initialData ? "Modifier" : "Enregistrer"}</button>
    </form>
  );
};

export default InscriptionForm;
//a méliorer