import React, { useState, useEffect, useCallback } from "react";
import ProductList from "./ProductList";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";
import { getAllProducts } from "../../../api/fetchProducts";

const ProductPanel = () => {
  const [products, setProducts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        // keep UI stable on error (fetchProducts.js handles logging)
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const handleCreate = useCallback((newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setIsCreating(false);
  }, []);

  const handleEdit = useCallback((updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  }, []);

  const handleDelete = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading products...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-lg">
      {!isCreating && !editingProduct && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-1 text-green-500 font-semibold border rounded-md hover:bg-green-500 hover:text-white transition"
          >
            Create +
          </button>
        </div>
      )}

      {isCreating && (
        <ProductCreate onCreate={handleCreate} onCancel={() => setIsCreating(false)} />
      )}

      {editingProduct && (
        <ProductEdit
          product={editingProduct}
          onSave={handleEdit}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      {!isCreating && !editingProduct && (
        <div className="space-y-4">
          {products.length === 0 ? (
            <p className="text-gray-500 text-center">No products found.</p>
          ) : (
            products.map((item) => (
              <ProductList
                key={item.id}
                img={item.thumbnail}
                name={item.name}
                brand={item.brand}
                price={item.price}
                category={item.category}
                onEdit={() => setEditingProduct(item)}
                onDelete={() => handleDelete(item.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPanel;
