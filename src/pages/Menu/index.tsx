import { useNavigate } from "react-router-dom";

interface MenuOption {
  label: string;
  description: string;
  path: string;
  badgeColor: string;
}

const MENU_OPTIONS: MenuOption[] = [
  {
    label: "SUM",
    description: "Herramienta de suma de números",
    path: "/sum",
    badgeColor: "#2563EB",
  },
  {
    label: "Calculator",
    description: "Calculadora de operaciones básicas",
    path: "/calculator",
    badgeColor: "#10B981",
  },
  {
    label: "Api",
    description: "Búsqueda con debounce en API",
    path: "/api",
    badgeColor: "#2563EB",
  },
  {
    label: "Form",
    description: "Formulario con validaciones",
    path: "/form",
    badgeColor: "#10B981",
  },
];

export default function Menu() {
  const navigate = useNavigate();
  const username = localStorage.getItem("user") || "Usuario";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="card" style={{ maxWidth: "680px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <div>
            <h2 style={{ marginBottom: "0.25rem" }}>Menú Principal</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Bienvenido, <strong>{username}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              backgroundColor: "transparent",
              color: "var(--text-muted)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              padding: "0.5rem 0.9rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {MENU_OPTIONS.map((option) => (
            <button
              key={option.path}
              type="button"
              onClick={() => navigate(option.path)}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--border-color)",
                borderLeft: `4px solid ${option.badgeColor}`,
                borderRadius: "10px",
                padding: "1.1rem",
                textAlign: "left",
                cursor: "pointer",
                transition: "transform 0.15s ease, border-color 0.15s ease",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.3rem" }}>
                {option.label}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                {option.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}