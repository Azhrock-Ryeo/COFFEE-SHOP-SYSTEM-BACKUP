import { useEffect, useState } from "react";

function AdminDashboard() {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });


  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");

      const data = await res.json();

      setProducts(data);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);


  // ADD PRODUCT
  const addProduct = async (e) => {
    e.preventDefault();

    try {

      await fetch("http://localhost:5000/products", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(form)
      });

      setForm({
        name: "",
        description: "",
        price: "",
        stock: ""
      });

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };


  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    try {

      await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE"
      });

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div
      style={{
        padding: "40px",
        color: "white"
      }}
    >

      <h1>☕ Admin Dashboard</h1>


      {/* ADD PRODUCT FORM */}
      <form
        onSubmit={addProduct}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          marginTop: "20px"
        }}
      >

        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({
              ...form,
              stock: e.target.value
            })
          }
        />

        <button type="submit">
          Add Product
        </button>

      </form>


      {/* PRODUCT LIST */}
      <div
        style={{
          marginTop: "40px"
        }}
      >

        <h2>Products</h2>

        {products.map((product) => (

          <div
            key={product.product_id}
            style={{
              border: "1px solid gray",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px"
            }}
          >

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <p>₱{product.price}</p>

            <p>Stock: {product.stock}</p>

            <button
              onClick={() =>
                deleteProduct(product.product_id)
              }
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminDashboard;