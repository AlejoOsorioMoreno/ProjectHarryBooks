import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx'
import { price, stock, urlsImage } from '../../index.js';

export const Books = () => {
  const [libros, setLibros] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [selectedLibros, setSelectedLibros] = useState([]);
  const [stockLeft, setStockLeft] = useState([...stock]);
  const url = 'https://harry-potter-api.onrender.com/libros';

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLibros(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCompra = (libro) => {
    const index = libros.findIndex((item) => item.id === libro.id);
    if (index !== -1 && stockLeft[index] > 0) {
      setSelectedLibros((prevSelectedLibros) => {
        const updatedSelectedLibros = [...prevSelectedLibros];
        const existingIndex = updatedSelectedLibros.findIndex((item) => item.id === libro.id);

        if (existingIndex !== -1) {
          updatedSelectedLibros[existingIndex].quantity += 1;
        } else {
          updatedSelectedLibros.push({ ...libro, quantity: 1 });
        }

        setStockLeft((prevStock) => {
          const updatedStock = [...prevStock];
          updatedStock[index] -= 1;
          return updatedStock;
        });

        return updatedSelectedLibros;
      });

      setCartCount(cartCount + 1);
    }
  };

  const resultBooks = libros.map((libro, i) => {
    const priceResult = price[i];
    const imageResult = urlsImage[i];
    const stockResult = stock[i];
    
    return { ...libro, priceResult, imageResult,stockResult };
  });

  return (
    <div>
      <Header cartCount={cartCount} selectedLibros={selectedLibros} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {resultBooks.map((books) => (
          <div key={books.id} className="border p-4 shadow-md">

            <img
              className="  h-60 w-60 ml-2"
              src={books.imageResult}
              alt={books.titulo_original}
            />

            <div className="text-xl font-semibold">{books.libro}</div>
            <div className="text-blue-600 font-semibold mt-2">Fecha de lanzamiento: {books.fecha_de_lanzamiento}</div>
            <div className="text-xl font-semibold">Precio: $ {books.priceResult}</div>
            <div className="text-xl font-semibold">Stok:  {books.stockResult} Unidades</div>
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