import React, {useState,useEffect} from "react";


// eslint-disable-next-line react/prop-types
export default function Header({ cartCount, selectedProducts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const viewCart = () => {
    setIsModalOpen(true);
    console.log("Entro al modal");
  };

  const closeCart = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <section id='header' className='flex items-center '>
        <header className=' flex gap-20 '>
          <h1 id='h1' className='flex items-center text-5xl'>
            HarryBooks
          </h1>
        </header>
        <div className='flex items-center'>
          <button>
            <span role='img' aria-label='Carrito de Compras' className='text-2xl ml-4' onClick={viewCart}>
              🛒

            </span>
          </button>
          <span className='ml-2 text-xl'>{cartCount}</span>
        </div>
      </section>
      {isModalOpen && (
        <>
          <div className="flex justify-center">
            <div className="flex justify-center absolute z-20 w-96">
              <div className="modal-overlay" onClick={closeCart}></div>
              <div className="modal h-auto">
                <div className="modal-content flex flex-col items-center">
                  <button
                    className="close-button bg-violet-950 text-[#e23434] w-96 rounded-md text-2xl font-bold"
                    onClick={closeCart}
                  >
                    Close car
                  </button>
                  <br />
                  <ul className="bg-[#9c7ac5] flex justify-center flex-col items-center w-96">
                    {selectedProducts.map((product, i) => (
                      <div key={i}> {/* Agregar un div como elemento padre */}
                        <li className="text-center w-96">
                          {product.title}
                        </li>
                        <li>
                          <img
                            src={product.image}
                            className="w-16"
                            alt=""
                          />
                        </li>
                        <li>
                          {product.price}
                        </li>
                        <hr className="h-[2px] bg-black w-96" />
                      </div>
                    ))}
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

