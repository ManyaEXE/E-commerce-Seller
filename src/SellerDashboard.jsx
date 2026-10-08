import React, { useState, useEffect } from "react";
import "./SellerDashboard.css";

function SellerDashboard() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [photo, setPhoto] = useState("");
  const [search, setSearch] = useState("");

  // Save products
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Add product
  const addProduct = (e) => {
    e.preventDefault();

    if (!name || !category || !price || !stock) {
      alert("Please fill all required fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name,
      category: category,
      price: Number(price),
      stock: Number(stock),
      photo: photo,
    };

    setProducts([...products, newProduct]);

    // Clear form
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setPhoto("");
  };

  // Image upload
  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setPhoto("");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      setPhoto(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Dashboard calculations
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  // Search
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      <h1>Seller Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="cards">

        <div className="card">
          <h2>Products</h2>
          <p>{totalProducts}</p>
        </div>

        <div className="card">
          <h2>Total Stock</h2>
          <p>{totalStock}</p>
        </div>

        <div className="card">
          <h2>Total Value</h2>
          <p>₹{totalValue}</p>
        </div>

      </div>

      {/* Add Product */}
      <h2>Add Product</h2>

      <form id="productForm" onSubmit={addProduct}>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Food">Food</option>
          <option value="Books">Books</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          min="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handlePhoto}
        />

        <button type="submit">Add Product</button>

      </form>

      {/* Search */}
      <input
        id="search"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Products */}
      <h2>My Products</h2>

      <table>

        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredProducts.map((product) => (

            <tr key={product.id}>

              <td>
                {product.photo ? (
                  <img
                    src={product.photo}
                    alt={product.name}
                    width="50"
                    height="50"
                  />
                ) : (
                  "No Image"
                )}
              </td>

              <td>{product.name}</td>

              <td>{product.category}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default SellerDashboard;