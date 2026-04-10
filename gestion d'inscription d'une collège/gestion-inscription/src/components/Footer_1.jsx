/* const Footer = () => {
  return (
    <footer>
      <p>© 2026 - Application Gestion des Inscriptions</p>
    </footer>
  );
};

export default Footer; */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>© {year} - Application Gestion des Inscriptions</p>
    </footer>
  );
};

export default Footer;
//à améliorer