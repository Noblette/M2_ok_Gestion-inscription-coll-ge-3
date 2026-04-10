import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardAdmin = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>👨‍💼 Tableau de bord Admin</h1>

      <ul>
        <li><a href="/classes">Gérer les classes</a></li>
        <li><a href="/eleves">Gérer les élèves</a></li>
        <li><a href="/inscriptions">Gérer les inscriptions</a></li>
      </ul>

      <button onClick={logout}>Déconnexion</button>
    </div>
  );
};

export default DashboardAdmin;