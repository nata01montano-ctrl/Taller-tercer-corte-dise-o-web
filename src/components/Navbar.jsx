
function Navbar({ activePage, onNavigate }) {
  const menuItems = [
    { id: "home", label: "Inicio", },
    { id: "bestiary", label: "Bestiario" },
    { id: "loot", label: "Botín" },
    { id: "dice", label: "Dados" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-icon" img="https://static.vecteezy.com/system/resources/thumbnails/073/442/379/small/detailed-stylized-illustration-of-a-fearsome-dragon-s-head-in-black-and-white-showcasing-intricate-scales-and-sharp-teeth-evoking-mythical-power-and-ancient-legends-free-vector.jpg"></span>
        <div>
          <h2>D&D MASTER</h2>
          <span>TOOLKIT</span>
        </div>
      </div>

      <div className="nav-links">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-link ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="nav-footer">
        <span>Preparate</span>
        <p>Tu aventura comienza aquí</p>
      </div>
    </nav>
  );
}

export default Navbar;
