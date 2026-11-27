import { useState } from "react";
import PageLayout from "../components/PageLayout.jsx";

const rows = [
  ["C", "DEL", "/", "*"],
  ["7", "8", "9", "-"],
  ["4", "5", "6", "+"],
  ["1", "2", "3", "="],
  ["0", "."],
];

const operators = ["+", "-", "*", "/"];

function calculate(a, b, op) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  if (op === "+") return x + y;
  if (op === "-") return x - y;
  if (op === "*") return x * y;
  if (op === "/") return y === 0 ? "Error" : x / y;
  return y;
}

const format = (n) => (n === "Error" ? n : String(parseFloat(Number(n).toFixed(10))));

export default function Screen2() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [overwrite, setOverwrite] = useState(false);

  const clearAll = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setOverwrite(false);
  };

  const handlePress = (key) => {
    if (key === "C") return clearAll();

    if (key === "DEL") {
      if (overwrite || display === "Error") return setDisplay("0");
      return setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
    }

    if (operators.includes(key)) {
      if (display === "Error") return;
      if (prev !== null && op && !overwrite) {
        const res = format(calculate(prev, display, op));
        setDisplay(res);
        setPrev(res === "Error" ? null : res);
      } else {
        setPrev(display);
      }
      setOp(key);
      return setOverwrite(true);
    }

    if (key === "=") {
      if (prev === null || !op) return;
      const res = format(calculate(prev, display, op));
      setDisplay(res);
      setPrev(null);
      setOp(null);
      return setOverwrite(true);
    }

    // digits and decimal point
    if (key === ".") {
      if (overwrite || display === "Error") {
        setDisplay("0.");
        return setOverwrite(false);
      }
      if (display.includes(".")) return;
      return setDisplay(display + ".");
    }

    if (overwrite || display === "0" || display === "Error") {
      setDisplay(key);
      setOverwrite(false);
    } else {
      setDisplay(display + key);
    }
  };

  const styleFor = (key) => {
    if (key === "=") return "btn-accent";
    if (key === "C" || key === "DEL") return "btn-danger";
    if (operators.includes(key)) return "btn-primary";
    return "btn-secondary";
  };

  return (
    <PageLayout title="Calculadora">
      <div className="card mx-auto max-w-xs space-y-4">
        <div className="rounded-lg border border-border bg-bg p-4 text-right">
          <div className="h-5 text-sm text-muted">
            {prev !== null && op ? `${prev} ${op}` : ""}
          </div>
          <div className="truncate text-3xl font-semibold">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {rows.flat().map((key) => (
            <button
              key={key}
              onClick={() => handlePress(key)}
              className={`${styleFor(key)} py-3 text-lg ${
                key === "0" || key === "." ? "col-span-2" : ""
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}