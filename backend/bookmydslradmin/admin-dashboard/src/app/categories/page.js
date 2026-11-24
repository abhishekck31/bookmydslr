'use client';
import { useState, useEffect } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://abhishek31.pythonanywhere.com/api/categories/');
      const data = await res.json();
      setCategories(data.results || data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Permanently delete this category?')) return;
    try {
      await fetch(`https://abhishek31.pythonanywhere.com/api/categories/${id}/`, { method: 'DELETE' });
      fetchCategories();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://abhishek31.pythonanywhere.com/api/categories/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setFormData({ name: '', description: '' });
      fetchCategories();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container animate-fade-in">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h1>Categories Setup</h1>
      </div>

      <div className="glass-panel delay-1 animate-fade-in" style={{ marginBottom: '2rem' }}>
        <h3>Add New Category</h3>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <input 
            className="form-input" 
            placeholder="Category Name" 
            required
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            style={{ marginBottom: 0, width: '250px' }} 
          />
          <input 
            className="form-input" 
            placeholder="Description (optional)" 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            style={{ marginBottom: 0, flex: 1 }} 
          />
          <button type="submit" className="btn">Add Category</button>
        </form>
      </div>

      <div className="glass-panel delay-2 animate-fade-in">
        {loading ? <p>Loading...</p> : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td><strong>{c.name}</strong></td>
                  <td style={{ color: 'var(--text-secondary)' }}>{c.description || '-'}</td>
                  <td>
                    <button className="btn-danger" style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }} onClick={() => handleDelete(c.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && <tr><td colSpan="4">No categories found.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
