
function Home({ onNavigate }) {
  const modules = [
    {
      id: "bestiary",
      title: "Bestiario",
      description:
        "Explora criaturas, monstruos y enemigos del mundo de D&D.",
      action: "Explorar criaturas",
    },
    {
      id: "loot",
      title: "Generador de Loot",
      description:
        "Genera tesoros, monedas y objetos para recompensar a tus jugadores.",
      action: "Generar recompensas",
    },
    {
      id: "dice",
      title: "Bandeja de Dados",
      description:
        "Lanza dados y obtén resultados aleatorios durante tus partidas.",
      action: "Lanzar dados",
    },
  ];

  return (
    <main className="page-content">
      <section className="welcome-section">
        <span className="eyebrow">DUNGEONS & DRAGONS 5E</span>

        <h1>
          Bienvenido,
          <br />
          <span>Dungeon Master</span>
        </h1>

        <p>
          Todas las herramientas que necesitas para dirigir
          tus aventuras están aquí.
        </p>

        <button
          className="primary-button"
          onClick={() => onNavigate("bestiary")}
        >
          Comenzar aventura!
        </button>
      </section>

      <section className="modules-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">HERRAMIENTAS</span>
            <h2>Tu mesa de aventura</h2>
          </div>
          <span className="module-count">03 MÓDULOS</span>
        </div>

        <div className="module-grid">
          {modules.map((module) => (
            <article className="module-card" key={module.id}>
              <div className="module-icon">
                {module.icon}
              </div>

              <h3>{module.title}</h3>

              <p>{module.description}</p>

              <button
                className="card-button"
                onClick={() => onNavigate(module.id)}
              >
                {module.action} →
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="tip-section">
        <span>..</span>
        <div>
          <h3>Consejo del Dungeon Master</h3>
          <p>
            Una gran aventura comienza con una buena historia.
            Prepárate para lo inesperado.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
