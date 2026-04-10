import { useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  //const [role, setRole] = useState("user");
  const [role] = useState("user");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", {
        nom,
        email,
        motdepasse,
        role,
      });
      setMessage("Compte créé !");
    } catch (err) {
      setMessage("Erreur: email déjà utilisé");
    }
  };

  return (
    <div className="form-container">
      <h2>Créer un compte</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={motdepasse}
          onChange={(e) => setMotdepasse(e.target.value)}
        />

        

        <button type="submit">S'inscrire</button>
        <Link to="/login" className="button-link">
          Se Connecter
        </Link>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;


//amélioration zao

//ny admin rery no tokony hisy choix soit user soit admin @ role
/* src/pages/Register.jsx
  Line 8:16:  'setRole' is assigned a value but never used  no-unused-vars

Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.

WARNING in [eslint] 
src/pages/Register.jsx
  Line 8:16:  'setRole' is assigned a value but never used  no-unused-vars

webpack compiled with 1 warning

 */

/* <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">user par defaut</option>
          <option value="null">null</option>
        </select> */



        {/* <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Utilisateur simple</option>
          <option value="admin">Administrateur</option>
        </select> */}