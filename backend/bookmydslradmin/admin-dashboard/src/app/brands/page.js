'use client';
import { useState, useEffect } from 'react';

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://abhishek31.pythonanywhere.com/api/brands/');
      const data = await res.json();
      setBrands(data.results || data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Permanently delete this brand?')) return;
    try {
      await fetch(`https://abhishek31.pythonanywhere.com/api/brands/${id}/`, { method: 'DELETE' });
      fetchBrands();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://abhishek31.pythonanywhere.com/api/brands/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setFormData({ name: '', description: '' });
      fetchBrands();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container animate-fade-in">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h1>Brands Setup</h1>
      </div>

      <div className="glass-panel delay-1 animate-fade-in" style={{ marginBottom: '2rem' }}>
        <h3>Add New Brand</h3>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <input 
            className="form-input" 
            placeholder="Brand Name" 
            required
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            style={{ marginBottom: 0, width: '250px' }} 
          />
          <input 
            className="form-input" 
            placeholder="Origin / Details (optional)" 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            style={{ marginBottom: 0, flex: 1 }} 
          />
          <button type="submit" className="btn">Add Brand</button>
        </form>
      </div>

      <div className="glass-panel delay-2 animate-fade-in">
        {loading ? <p>Loading...</p> : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand Name</th>
                <th>Additional Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map(b => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td><strong>{b.name}</strong></td>
                  <td style={{ color: 'var(--text-secondary)' }}>{b.description || '-'}</td>
                  <td>
                    <button className="btn-danger" style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }} onClick={() => handleDelete(b.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {brands.length === 0 && <tr><td colSpan="4">No brands found.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
