import React, { useState } from 'react';

export default function Header({ cartCount, selectedLibros, actualizarStock, updateCartAfterBuy, clearCartAfterBuy }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const viewCart = () => {
    setIsModalOpen(true);
  };

  const totalCobrar = selectedLibros.reduce((total, libro) => {
    return total + (libro.priceResult * libro.quantity);
  }, 0);

  const closeCart = () => {
    setIsModalOpen(false);
  };

  const handleBuyClick = () => {
    // Realizar la lógica de compra aquí, si es necesario

    // Muestra la alerta "COMPRA EXITOSA"
    alert('COMPRA EXITOSA');

    // Cierra el modal
    closeCart();

    // Vacía el carrito
    setCart([]);

    // Actualizar el stock de los libros
    selectedLibros.forEach((libro) => {
      actualizarStock(libro.id, libro.quantity);
    });

    updateCartAfterBuy();

    clearCartAfterBuy();
  };

  const addToCart = (libro) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex((item) => item.id === libro.id);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...libro, quantity: 1 });
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
          <div className="relative z-10 mx-auto max-w-xl p-4 bg-white rounded shadow-lg overflow-y-auto">
            <button
              className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800"
              onClick={closeCart}
            >
              X
            </button>
            <div className="modal-content flex flex-col items-center">
            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
              <ul className="flex flex-col items-center space-y-4">
                {selectedLibros.map((libro, i) => (
                  <div key={i}>
                    <li className="text-center">{libro.titulo_original}</li>
                    <li>
                      <img src={libro.imageResult} className="w-16" alt="" />
                    </li>
                    <li>{libro.priceResult} $</li>
                    <li>{libro.stockResult} Unidades</li>
                    <li>
                      Cantidad:
                      <input
                        type="number"
                        min="1"
                        value={libro.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          addToCart({ ...libro, quantity: newQuantity });
                        }}
                      />
                    </li>
                    <hr className="my-2 border-t border-gray-300" />
                  </div>
                ))}
              </ul>
            </div>
              <li>Total a cobrar: {totalCobrar}</li>

              <button
                className="bg-blue-500 text-white py-2 px-4 mt-4 hover-bg-blue-600"
                onClick={handleBuyClick}
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
