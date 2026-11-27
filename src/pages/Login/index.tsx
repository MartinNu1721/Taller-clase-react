import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !pass.trim()) {
      setError("Por favor ingresa tu usuario y contraseña.");
      return;
    }

    localStorage.setItem("user", username.trim());
    navigate("/menu");
  };

  return (
    <div className="page-container">
      <div className="card" style={{ maxWidth: "400px" }}>
        <h2 style={{ marginBottom: "0.5rem", textAlign: "center" }}>
          Iniciar Sesión
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Taller de React - Ingresa tus credenciales
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label htmlFor="username" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ej. admin"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              style={{
                padding: "0.65rem 0.85rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                fontSize: "0.95rem",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label htmlFor="pass" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
              Pass
            </label>
            <input
              id="pass"
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setError("");
              }}
              style={{
                padding: "0.65rem 0.85rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                fontSize: "0.95rem",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "var(--danger)", fontSize: "0.85rem" }}>{error}</p>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: "0.5rem", width: "100%" }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}