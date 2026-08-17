// src/components/admin/ProductManager.jsx
import React, { useState, useEffect } from 'react';
import API from '../../utils/api';

const initialFormState = {
  nameEn: '',
  nameAr: '',
  descriptionEn: '',
  descriptionAr: '',
  price: '',
  category: '',
  brand: '',
  countInStock: '',
  image: '',
};

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [showModal, setShowModal] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get('/products?pageSize=0');
      const data = Array.isArray(res.data) ? res.data : res.data?.products || [];
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open modal to add new product
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setError('');
    setSuccess('');
    setShowModal(true);
  };

  // Open modal to edit existing product
  const handleOpenEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      nameEn: product.name?.en || '',
      nameAr: product.name?.ar || '',
      descriptionEn: product.description?.en || '',
      descriptionAr: product.description?.ar || '',
      price: product.price || '',
      category: product.category || '',
      brand: product.brand || '',
      countInStock: product.countInStock || '',
      image: product.image || '',
    });
    setError('');
    setSuccess('');
    setShowModal(true);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      setSuccess('Product deleted successfully');
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  // Submit form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const payload = {
      name: {
        en: formData.nameEn,
        ar: formData.nameAr,
      },
      description: {
        en: formData.descriptionEn,
        ar: formData.descriptionAr,
      },
      price: Number(formData.price),
      category: formData.category,
      brand: formData.brand,
      countInStock: Number(formData.countInStock),
      image: formData.image,
    };

    try {
      if (editingId) {
        // Update product
        const res = await API.put(`/products/${editingId}`, payload);
        const updatedProduct = res.data?.product || res.data;
        setProducts(products.map((p) => (p._id === editingId ? updatedProduct : p)));
        setSuccess('Product updated successfully');
      } else {
        // Create new product
        const res = await API.post('/products', payload);
        const newProduct = res.data?.product || res.data;
        setProducts([newProduct, ...products]);
        setSuccess('Product created successfully');
      }
      setShowModal(false);
      setFormData(initialFormState);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Product Management</h2>
        <button style={styles.addBtn} onClick={handleOpenAdd}>
          ➕ Add Product
        </button>
      </div>

      {error && <div style={styles.errorBanner}>{error}</div>}
      {success && <div style={styles.successBanner}>{success}</div>}

      {/* Products Table */}
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Name (EN)</th>
                <th style={styles.th}>Name (AR)</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Stock</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" style={styles.emptyTd}>
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} style={styles.tableRow}>
                    <td style={styles.td}>
                      <img
                        src={product.image || 'https://via.placeholder.com/50'}
                        alt={product.name?.en || 'Product'}
                        style={styles.productThumb}
                      />
                    </td>
                    <td style={styles.td}>{product.name?.en || '-'}</td>
                    <td style={styles.td}>{product.name?.ar || '-'}</td>
                    <td style={styles.td}>{product.category}</td>
                    <td style={styles.td}>AED {product.price?.toFixed(2)}</td>
                    <td style={styles.td}>{product.countInStock}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleOpenEdit(product)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(product._id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
              <button style={styles.closeBtn} onClick={() => setShowModal(false)}>
                ✖
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGrid}>
                <div style={styles.field}>
                  <label style={styles.label}>Name (English)</label>
                  <input
                    type="text"
                    name="nameEn"
                    value={formData.nameEn}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Name (Arabic)</label>
                  <input
                    type="text"
                    name="nameAr"
                    value={formData.nameAr}
                    onChange={handleChange}
                    style={styles.input}
                    dir="rtl"
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Price (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Count In Stock</label>
                  <input
                    type="number"
                    name="countInStock"
                    value={formData.countInStock}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={{ ...styles.field, gridColumn: 'span 2' }}>
                  <label style={styles.label}>Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    style={styles.input}
                  />
                </div>

                <div style={{ ...styles.field, gridColumn: 'span 2' }}>
                  <label style={styles.label}>Description (English)</label>
                  <textarea
                    name="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={handleChange}
                    rows="3"
                    style={styles.textarea}
                  />
                </div>

                <div style={{ ...styles.field, gridColumn: 'span 2' }}>
                  <label style={styles.label}>Description (Arabic)</label>
                  <textarea
                    name="descriptionAr"
                    value={formData.descriptionAr}
                    onChange={handleChange}
                    rows="3"
                    style={styles.textarea}
                    dir="rtl"
                  />
                </div>
              </div>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.saveBtn}>
                  {editingId ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
  },
  addBtn: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  tableHeaderRow: {
    borderBottom: '2px solid #f1f5f9',
  },
  th: {
    padding: '12px 8px',
    fontSize: '0.85rem',
    color: '#64748b',
    fontWeight: '600',
  },
  tableRow: {
    borderBottom: '1px solid #f1f5f9',
  },
  td: {
    padding: '12px 8px',
    fontSize: '0.875rem',
    color: '#334155',
  },
  emptyTd: {
    textAlign: 'center',
    padding: '24px',
    color: '#64748b',
  },
  productThumb: {
    width: '45px',
    height: '45px',
    objectFit: 'cover',
    borderRadius: '6px',
    backgroundColor: '#f1f5f9',
  },
  editBtn: {
    backgroundColor: '#f1f5f9',
    border: '1px solid #cbd5e1',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '8px',
    fontSize: '0.8rem',
  },
  deleteBtn: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    border: '1px solid #fca5a5',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '650px',
    maxHeight: '90vh',
    overflowY: 'auto',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#64748b',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#334155',
  },
  input: {
    padding: '10px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '0.9rem',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '0.9rem',
    resize: 'vertical',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '10px',
  },
  cancelBtn: {
    padding: '10px 16px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  saveBtn: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  errorBanner: {
    padding: '12px',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    borderRadius: '6px',
    fontSize: '0.875rem',
  },
  successBanner: {
    padding: '12px',
    backgroundColor: '#dcfce7',
    color: '#15803d',
    borderRadius: '6px',
    fontSize: '0.875rem',
  },
};

export default ProductManager;