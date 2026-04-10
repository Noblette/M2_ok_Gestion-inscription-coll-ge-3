import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardUser = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>👤 Tableau de bord Utilisateur</h1>

      <ul>
        <li><a href="/eleves">Liste des élèves</a></li>
        <li><a href="/inscriptions">Liste des inscriptions</a></li>
      </ul>

      <button onClick={logout}>Déconnexion</button>
    </div>
  );
};

export default DashboardUser;
//à améliorer la vue