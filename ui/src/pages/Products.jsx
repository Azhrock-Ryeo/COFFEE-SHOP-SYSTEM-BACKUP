import Navbar from "../components/Navbar"
import "./Products.css"

function Products({ setUser }) {
  const products = [
    {
      id: 1,
      name: "Caramel Latte",
      price: "₱180",
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c"
    },
    {
      id: 2,
      name: "Cold Brew",
      price: "₱150",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
    },
    {
      id: 3,
      name: "Espresso",
      price: "₱120",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
    },
    {
      id: 4,
      name: "Matcha Latte",
      price: "₱170",
      image:
        "https://images.unsplash.com/photo-1515823064-d6e0c04616a7"
    }
  ]

  return (
    <>
      <Navbar setUser={setUser} />

      <div className="shop-page">

        {/* HERO */}
        <section className="hero-banner">
          <div className="hero-overlay">
            <h1>Premium Coffee Experience ☕</h1>
            <p>
              Freshly brewed coffee delivered to your door.
            </p>

            <button className="hero-btn">
              Shop Now
            </button>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="products-section">

          <div className="section-title">
            <h2>Popular Products</h2>
          </div>

          <div className="products-grid">

            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
              >
                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="product-info">
                  <h3>{product.name}</h3>

                  <p>{product.price}</p>

                  <button>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}

          </div>
        </section>

      </div>
    </>
  )
}

export default Products