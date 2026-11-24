'use client';
import { useState, useEffect } from 'react';

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ offer_name: '', discount_percentage: '', is_active: true });

  const fetchDiscounts = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://abhishek31.pythonanywhere.com/api/discounts/');
      const data = await res.json();
      setDiscounts(data.results || data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Permanent delete this discount?')) return;
    try {
      await fetch(`https://abhishek31.pythonanywhere.com/api/discounts/${id}/`, { method: 'DELETE' });
      fetchDiscounts();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://abhishek31.pythonanywhere.com/api/discounts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offer_name: formData.offer_name,
          discount_percentage: parseFloat(formData.discount_percentage),
          is_active: formData.is_active
        })
      });
      setFormData({ offer_name: '', discount_percentage: '', is_active: true });
      fetchDiscounts();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container animate-fade-in">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h1>Global Discounts</h1>
      </div>

      <div className="glass-panel delay-1 animate-fade-in" style={{ marginBottom: '2rem' }}>
        <h3>Add New Discount</h3>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
          <input 
            className="form-input" 
            placeholder="Offer Name (e.g. Diwali Sale)" 
            required
            value={formData.offer_name} 
            onChange={e => setFormData({...formData, offer_name: e.target.value})} 
            style={{ marginBottom: 0, width: '250px' }} 
          />
          <input 
            className="form-input" 
            placeholder="Percentage (e.g. 15)" 
            type="number"
            step="0.01"
            required
            value={formData.discount_percentage} 
            onChange={e => setFormData({...formData, discount_percentage: e.target.value})} 
            style={{ marginBottom: 0, width: '150px' }} 
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <input 
              type="checkbox" 
              checked={formData.is_active} 
              onChange={e => setFormData({...formData, is_active: e.target.checked})} 
            />
            Active
          </label>
          <button type="submit" className="btn" style={{ marginLeft: 'auto' }}>Create Offer</button>
        </form>
      </div>

      <div className="glass-panel delay-2 animate-fade-in">
        {loading ? <p>Loading...</p> : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Offer Name</th>
                <th>Discount %</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td><strong>{d.offer_name}</strong></td>
                  <td style={{ color: 'var(--success)', fontWeight: 'bold' }}>{d.discount_percentage}% OFF</td>
                  <td>
                    <span className="badge" style={{ background: d.is_active ? 'var(--accent-glow)' : 'rgba(255,255,255,0.1)', color: d.is_active ? '#60a5fa' : '#a1a1aa' }}>
                      {d.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-danger" style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }} onClick={() => handleDelete(d.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {discounts.length === 0 && <tr><td colSpan="5">No active discounts found.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
