import React, { useState, useEffect } from 'react';
import piedraFilosofal from '../Images/piedra_filosofal.png';
import camarasecreta from '../Images/camara_secreta.png';
import prisionero from '../Images/prisionero.png';
import caliz from '../Images/caliz_fuego.png';
import ordenFenix from '../Images/orden_fenix.png';
import misterio from '../Images/misterio_principe.png';
import reliquias from '../Images/reliquias_muerte.png';
import legado from '../Images/legado_maldito.png';

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

  const price = [
    25000,
    20000,
    30000,
    35000,
    15000,
    40000,
    32000,
    28000
  ];

  const urlsImage = [
    piedraFilosofal,
    camarasecreta, 
    prisionero, 
    caliz,  
    ordenFenix, 
    misterio,
    reliquias,
    legado
  ];

  const resultBooks = libros.map((libro, i) => {
    const priceResult = price[i];
    const imageResult = urlsImage[i];
    return { ...libro, priceResult, imageResult };
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {resultBooks.map((books) => (
          <div key={books.id} className="border p-4 shadow-md">

            <img
              className="w-40 h-40 mt-4"
              src={books.imageResult}
              alt={books.titulo_original}
            />

            <div className="text-xl font-semibold">{books.libro}</div>
            <div className="text-blue-600 font-semibold mt-2">Fecha de lanzamiento: {books.fecha_de_lanzamiento}</div>
            <div className="text-xl font-semibold">{books.descripcion}</div>
            <div className="text-xl font-semibold">Precio: $ {books.priceResult}</div>

            <button
              className="bg-blue-500 text-white py-2 px-4 mt-4 hover:bg-blue-600"
              onClick={() => handleCompra(books)}
            >
              Comprar
            </button>
            <br></br><br></br>
          </div>
        ))}
      </div>
    </div>
  );
};


