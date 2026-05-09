import { useEffect, useState } from "react";
import "./AdminStyle.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const [editId, setEditId] = useState(null);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();

      setProducts(data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await fetch(`http://localhost:5000/products/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        setEditId(null);
      } else {
        await fetch("http://localhost:5000/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
      }

      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
      });

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT
  const editProduct = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock || "",
    });

    setEditId(product.product_id);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">
        Admin Product Management
      </h1>

      {/* FORM */}
      <div className="admin-form-box">
        <h2 className="admin-subtitle">
          {editId ? "Edit Product" : "Add Product"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="admin-form"
        >
          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            required
            className="admin-input"
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            className="admin-input"
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
            required
            className="admin-input"
          />

          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) =>
              setForm({
                ...form,
                stock: e.target.value,
              })
            }
            className="admin-input"
          />

          <button
            type="submit"
            className={`admin-submit-btn ${
              editId ? "update-btn" : "add-btn"
            }`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₱{product.price}</td>
                <td>{product.stock}</td>

                <td>
                  <button
                    onClick={() =>
                      editProduct(product)
                    }
                    className="edit-btn"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteProduct(
                        product.product_id
                      )
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="no-products"
              >
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;