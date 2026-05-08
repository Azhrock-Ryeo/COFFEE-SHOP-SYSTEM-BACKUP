import { useEffect, useState } from "react";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: ""
  });

  // GET PRODUCTS
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD PRODUCT
  const addProduct = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ name: "", price: "", description: "" });
    fetchProducts();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      {/* ADD PRODUCT FORM */}
      <form onSubmit={addProduct}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Add Product</button>
      </form>

      {/* PRODUCT LIST */}
      <h3>Products</h3>
      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h4>{p.name}</h4>
          <p>{p.description}</p>
          <p>₱{p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;