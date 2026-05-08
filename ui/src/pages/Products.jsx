import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Products.css";

function Products({ setUser }) {

  const [products, setProducts] = useState([]);


  useEffect(() => {

    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

  }, []);


  return (
    <>
      <Navbar setUser={setUser} />

      <div className="shop-page">

        <section className="products-section">

          <div className="section-title">
            <h2>Products</h2>
          </div>

          <div className="products-grid">

            {products.map((product) => (

              <div
                key={product.product_id}
                className="product-card"
              >

                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
                  alt={product.name}
                />

                <div className="product-info">

                  <h3>{product.name}</h3>

                  <p>₱{product.price}</p>

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
  );
}

export default Products;