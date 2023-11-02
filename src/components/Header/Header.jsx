import React, { useState } from 'react';

export default function Header({ cartCount, selectedLibros }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState([]); // Estado del carrito de compras

  const viewCart = () => {
    setIsModalOpen(true);
  };

  const closeCart = () => {
    setIsModalOpen(false);
  };

  // Función para incrementar la cantidad de un libro en el carrito
  const incrementQuantity = (libro) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.id === libro.id);
    if (index !== -1) {
      updatedCart[index].quantity += 1;
    }
    setCart(updatedCart);
  };

  return (
    <>
      <section id="header" className="flex items-center">
        <header className="flex gap-20">
          <h1 id="h1" className="flex items-center text-5xl">
            HarryBooks
          </h1>
        </header>

        <div className="flex items-center">
          <button>
            <span
              role="img"
              aria-label="Carrito de Compras"
              className="text-2xl"
              onClick={viewCart}
            >
              🛒
            </span>
          </button>
          <span className="ml-2 text-xl">{cartCount}</span>
        </div>
      </section>
      {isModalOpen && (
        <div className="flex justify-center">
          <div className="flex justify-center absolute z-20 w-96">
            <div className="modal-overlay" onClick={closeCart}></div>
            <div className="modal h-auto bg-white">
              <div className="modal-content flex flex-col items-center">
                <br />
                <ul className="flex justify-center flex-col items-center w-96">
                  {selectedLibros.map((libro, i) => (
                    <div key={i}>
                      <li className="text-center w-96">{libro.titulo_original}</li>
                      <li>
                        <img src={libro.imageResult} className="w-16" alt="" />
                      </li>
                      <li>{libro.priceResult} $</li>
                      <li>{libro.stockResult} Unidades</li>
                      <button
                        className="absolute top-0 right-0 m-2 text-2xl cursor-pointer"
                        onClick={closeCart}
                      ></button>
                      <hr className="h-[2px] bg-black w-96" />

                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
