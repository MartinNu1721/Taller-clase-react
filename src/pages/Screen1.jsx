import { useState } from "react";
import PageLayout from "../components/PageLayout.jsx";

export default function Screen1() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSum = (e) => {
    e.preventDefault();
    if (a.trim() === "" || b.trim() === "" || isNaN(a) || isNaN(b)) {
      setError("Ingresa dos números válidos");
      setResult(null);
      return;
    }
    setError("");
    setResult(Number(a) + Number(b));
  };

  const handleReset = () => {
    setA("");
    setB("");
    setResult(null);
    setError("");
  };

  return (
    <PageLayout title="Suma">
      <form onSubmit={handleSum} className="card mx-auto max-w-md space-y-4" noValidate>
        <div>
          <label htmlFor="a" className="mb-1 block text-sm font-medium">
            Primer número
          </label>
          <input
            id="a"
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className={`input ${error ? "input-error" : ""}`}
            placeholder="0"
          />
        </div>

        <div>
          <label htmlFor="b" className="mb-1 block text-sm font-medium">
            Segundo número
          </label>
          <input
            id="b"
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className={`input ${error ? "input-error" : ""}`}
            placeholder="0"
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" className="btn-accent flex-1">
            Sumar
          </button>
          <button type="button" onClick={handleReset} className="btn-danger flex-1">
            Reset
          </button>
        </div>

        {result !== null && (
          <p className="rounded-lg border border-border bg-bg p-4 text-center text-xl font-semibold">
            Resultado: {result}
          </p>
        )}
      </form>
    </PageLayout>
  );
}