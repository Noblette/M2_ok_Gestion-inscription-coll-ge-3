const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[oklch(0.373_0.034_259.733)] px-4 py-4 text-center text-sm text-white/80">
      <p>© {year} - Application Gestion des Inscriptions</p>
    </footer>
  );
};

export default Footer;