import React, { useState, useEffect } from 'react';

export const Books = () => {
  const [libros, setLibros] = useState([]);
  const url = 'https://harry-potter-api.onrender.com/libros';

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLibros(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCompra = (product) => {
    // Implementa la lógica para agregar un libro al carrito aquí
    // Puedes utilizar un estado para mantener un seguimiento de los libros en el carrito
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {libros.map((libro) => (
          <div key={libro.id} className="border p-4 shadow-md">
            <div className="text-xl font-semibold">{libro.libro}</div>
            <div className="text-blue-600 font-semibold mt-2">Fecha de lanzamiento: {libro.fecha_de_lanzamiento}</div>
            <div className="text-xl font-semibold">{libro.descripcion}</div>

            <img
              className="w-40 h-40 mt-4"
              src={libro.imagen}
              alt={libro.title}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 mt-4 hover:bg-blue-600"
              onClick={() => handleCompra(libro)}
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


