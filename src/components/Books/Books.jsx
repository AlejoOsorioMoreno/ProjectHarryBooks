import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import { price, stock, urlsImage } from '../../index.js';

export const Books = () => {
  const [libros, setLibros] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [selectedLibros, setSelectedLibros] = useState([]);
  const [stockLeft, setStockLeft] = useState([...stock]);
  const [selectedQuantities, setSelectedQuantities] = useState({}); // Nuevo estado para rastrear las cantidades

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
    const selectedQuantity = selectedQuantities[libro.id] || 1;

    if (index !== -1 && stockLeft[index] >= selectedQuantity) {
      const updatedSelectedLibros = [...selectedLibros];
      const existingIndex = updatedSelectedLibros.findIndex((item) => item.id === libro.id);

      if (existingIndex !== -1) {
        updatedSelectedLibros[existingIndex].quantity += selectedQuantity;
      } else {
        updatedSelectedLibros.push({ ...libro, quantity: selectedQuantity });
      }

      /* setStockLeft((prevStock) => {
        const updatedStock = [...prevStock];
        updatedStock[index] -= selectedQuantity;
        return updatedStock;
      }); */

      setSelectedLibros(updatedSelectedLibros);
      updateCartCount(updatedSelectedLibros);
      resetSelectedQuantity(libro); // Restablecer la cantidad después de la compra
    }
  };

  const updateCartCount = (selectedLibros) => {
    let totalQuantity = 0;
    for (const libro of selectedLibros) {
      totalQuantity += libro.quantity;
    }
    setCartCount(totalQuantity);
  };

  const resetSelectedQuantity = (libro) => {
    const id = libro.id;
    setSelectedQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      updatedQuantities[id] = 1; // Restablecer la cantidad a 1
      return updatedQuantities;
    });
  };

  const actualizarStock = (id, cantidad) => {
    setStockLeft((prevStock) => {
      const updatedStock = [...prevStock];
      const index = libros.findIndex((libro) => libro.id === id);
      updatedStock[index] -= cantidad;
      return updatedStock;
    });
  };

  const resultBooks = libros.map((libro, i) => {
    const priceResult = price[i];
    const imageResult = urlsImage[i];
    const stockResult = stockLeft[i];

    const selectedLibro = selectedLibros.find((item) => item.id === libro.id);
    const selectedQuantity = selectedQuantities[libro.id] || 1;

    return { ...libro, priceResult, imageResult, stockResult, selectedQuantity };
  });

  return (
    <div>
      <Header cartCount={cartCount} selectedLibros={selectedLibros} actualizarStock={actualizarStock} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {resultBooks.map((books) => (
          <div key={books.id} className="border p-4 shadow-md">
            <img className="h-60 w-60 ml-2" src={books.imageResult} alt={books.titulo_original} />
            <div className="text-xl font-semibold">{books.libro}</div>
            <div className="text-blue-600 font-semibold mt-2">Fecha de lanzamiento: {books.fecha_de_lanzamiento}</div>
            <div className="text-xl font-semibold">Precio: $ {books.priceResult}</div>
            <div className="text-xl font-semibold">Stock: {books.stockResult} Unidades</div>
            <div className="text-xl font-semibold">Cantidad:
              <input
                type="number"
                value={books.selectedQuantity}
                min="1"
                max={books.stockResult}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value);
                  setSelectedQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [books.id]: newQuantity,
                  }));
                }}
              />
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 mt-4 hover-bg-blue-600"
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
