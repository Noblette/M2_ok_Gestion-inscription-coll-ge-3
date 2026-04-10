import { useState, useEffect } from "react";
import api from "../api/axios";

const EleveForm = ({ initialData = null, onSuccess }) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [classeId, setClasseId] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const loadClasses = async () => {
      const res = await api.get("/classes");
      setClasses(res.data);
    };
    loadClasses();

    if (initialData) {
      setNom(initialData.nom);
      setPrenom(initialData.prenom);
      setClasseId(initialData.classeId);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { nom, prenom, classeId };

      if (initialData) {
        await api.put(`/eleves/${initialData._id}`, payload);
      } else {
        await api.post("/eleves", payload);
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialData ? "Modifier Élève" : "Ajouter Élève"}</h3>

      <label>Nom :</label>
      <input value={nom} onChange={(e) => setNom(e.target.value)} required />

      <label>Prénom :</label>
      <input
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        required
      />

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

      <button type="submit">{initialData ? "Modifier" : "Créer"}</button>
    </form>
  );
};

export default EleveForm;
//à améliorer