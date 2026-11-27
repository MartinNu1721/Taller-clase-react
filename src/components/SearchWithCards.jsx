import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import CardItem from './CardItem';
import DetailModal from './DetailModal';

export default function SearchWithCards() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // 1. Aplicamos el Debounce (espera 500ms después de que dejes de escribir)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 2. Efecto que consulta la API
  useEffect(() => {
    const fetchData = async () => {
      // Si el usuario borra todo, limpiamos la lista
      if (debouncedSearchTerm.trim() === '') {
        setItems([]);
        return;
      }

      setLoading(true);
      try {
        // Codificamos la expresión para que la URL sea válida (ej: "2+2" -> "2%2B2")
        const expresion = encodeURIComponent(debouncedSearchTerm);
        
        // Llamamos a la API real de matemáticas
        const response = await fetch(`https://api.mathjs.org/v4/?expr=${expresion}`);
        
        if (!response.ok) {
          throw new Error('Error en la API');
        }

        const resultText = await response.text(); // La API devuelve el resultado como texto
        
        // Si la API devuelve un error interno, lo atajamos
        if (resultText.includes("Error")) {
             throw new Error('Expresión no válida');
        }

        const newItem = {
          id: Date.now(),
          title: `Resultado de: ${debouncedSearchTerm}`,
          description: `El resultado matemático es: ${resultText}`
        };

        setItems([newItem]);

      } catch (error) {
        console.error("Error al buscar:", error);
        setItems([{ 
          id: 'error', 
          title: 'Expresión no válida', 
          description: 'Por favor, escribe una operación matemática válida. Ejemplos: 2+2, 10*5, 100/4, sqrt(16).' 
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearchTerm]); // Se ejecuta cada vez que el texto debounced cambia

  return (
    <div style={{ padding: '20px' }}>
      <h1>Buscador Matemático (API Real)</h1>
      <p style={{ color: 'gray' }}>Escribe una operación (ej: 2+2, 10*5, 100/4) para ver el resultado.</p>
      
      <input
        type="text"
        placeholder="Escribe una operación matemática..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '20px', fontSize: '16px' }}
      />

      {/* Mensaje de carga mientras la API responde */}
      {loading && <p>Calculando en internet...</p>}

      {/* Mostramos las tarjetas */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map((item) => (
          <CardItem key={item.id} item={item} onClick={() => setSelectedItem(item)} />
        ))}
      </div>

      {/* El modal de detalle */}
      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}