'use client';
import { useState, useEffect } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  // Product Form Data
  const [formData, setFormData] = useState({ 
    name: '', 
    price_per_day: '',
    category: '',
    brand: '',
    description: '',
    image_url: '',
    is_active: true
  });

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes, brandRes] = await Promise.all([
        fetch('https://abhishek31.pythonanywhere.com/api/products/'),
        fetch('https://abhishek31.pythonanywhere.com/api/categories/'),
        fetch('https://abhishek31.pythonanywhere.com/api/brands/')
      ]);
      const pData = await prodRes.json();
      const cData = await catRes.json();
      const bData = await brandRes.json();
      
      setProducts(pData.results || pData);
      setCategories(cData.results || cData);
      setBrands(bData.results || bData);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to deactivate this product?')) return;
    try {
      await fetch(`https://abhishek31.pythonanywhere.com/api/products/${id}/`, { method: 'DELETE' });
      fetchAllData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price_per_day: product.price_per_day,
      category: product.category || '',
      brand: product.brand || '',
      description: product.description || '',
      image_url: product.image_url || '',
      is_active: product.is_active
    });
    // Scroll to the top of the form for mobile users
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', price_per_day: '', category: '', brand: '', description: '', image_url: '', is_active: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // DRF expects category and brand to be primary keys (IDs)
      const payload = {
        name: formData.name, 
        price_per_day: parseInt(formData.price_per_day),
        description: formData.description,
        image_url: formData.image_url,
        is_active: formData.is_active
      };
      // For DRF we need explicitly null or integer if it's a ForeignKey
      payload.category = formData.category ? parseInt(formData.category) : null;
      payload.brand = formData.brand ? parseInt(formData.brand) : null;

      const url = editingId ? `https://abhishek31.pythonanywhere.com/api/products/${editingId}/` : 'https://abhishek31.pythonanywhere.com/api/products/';
      const method = editingId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        cancelEdit();
        fetchAllData();
      } else {
        const errorData = await res.json();
        console.error('Server error:', errorData);
        alert('Failed to save product. Check console for details.');
      }
      
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container animate-fade-in">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h1>Products Management</h1>
      </div>

      <div className="glass-panel delay-1 animate-fade-in" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>
          {editingId ? `Editing Product #${editingId}` : 'Add New Product'}
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <input className="form-input" placeholder="Product Name *" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ marginBottom: 0 }} />
          <input className="form-input" placeholder="Price/Day *" type="number" required value={formData.price_per_day} onChange={e => setFormData({...formData, price_per_day: e.target.value})} style={{ marginBottom: 0 }} />
          
          <select className="form-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ marginBottom: 0 }}>
            <option value="">Select Category (Optional)</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select className="form-input" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} style={{ marginBottom: 0 }}>
            <option value="">Select Brand (Optional)</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>

          <input className="form-input" placeholder="Image URL (Optional)" type="url" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} style={{ marginBottom: 0 }} />
          <input className="form-input" placeholder="Short Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ marginBottom: 0 }} />
          
          {editingId && (
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', gridColumn: 'span 2', color: 'var(--text-secondary)' }}>
              <input 
                type="checkbox" 
                checked={formData.is_active} 
                onChange={e => setFormData({...formData, is_active: e.target.checked})} 
              />
              Inventory is Active (Available for use)
            </label>
          )}

          <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn" style={{ flex: 1, background: editingId ? '#10b981' : 'var(--accent)' }}>
              {editingId ? 'Save Changes' : 'Create Product'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-danger" onClick={cancelEdit} style={{ flex: 1 }}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="glass-panel delay-2 animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3>Inventory Database</h3>
        </div>
        {loading ? <p>Loading products...</p> : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price/Day</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {p.image_url ? (
                        <div style={{ width: '40px', height: '40px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--glass-border)', flexShrink: 0 }}>
                          <img src={p.image_url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: 'var(--panel-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '10px', flexShrink: 0 }}>
                          No Img
                        </div>
                      )}
                      <strong>{p.name}</strong>
                    </div>
                  </td>
                  <td>{p.category ? categories.find(c => c.id === p.category)?.name || p.category : '-'}</td>
                  <td>{p.brand ? brands.find(b => b.id === p.brand)?.name || p.brand : '-'}</td>
                  <td>₹{p.price_per_day}</td>
                  <td>
                    <span className="badge" style={{ background: p.is_active ? 'var(--accent-glow)' : 'rgba(255,255,255,0.1)', color: p.is_active ? '#60a5fa' : '#a1a1aa' }}>
                      {p.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn" style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', background: 'var(--panel-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }} onClick={() => handleEditClick(p)}>
                        Edit
                      </button>
                      <button className="btn-danger" style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }} onClick={() => handleDelete(p.id)}>
                        {p.is_active ? "Deactivate" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && <tr><td colSpan="7">No products found.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
