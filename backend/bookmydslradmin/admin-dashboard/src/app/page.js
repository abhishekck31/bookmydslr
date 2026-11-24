import './globals.css';

// Using fetch with no-store to keep it dynamic and fresh, avoiding static site generation cache.
async function fetchDashboardData() {
  const fetchResource = async (resourceName) => {
    try {
      const response = await fetch(`https://abhishek31.pythonanywhere.com/api/${resourceName}/`, { 
        cache: 'no-store' 
      });
      if (!response.ok) return { count: 0, results: [] };
      const data = await response.json();
      
      // DRF pagination wrapper check or flat list check
      if (data.results) {
        return { count: data.count || data.results.length, results: data.results };
      }
      return { count: Array.isArray(data) ? data.length : 0, results: Array.isArray(data) ? data : [] };
    } catch (e) {
      console.error(`Failed to fetch ${resourceName}`, e);
      return { count: '-', results: [] };
    }
  };

  const [products, categories, brands] = await Promise.all([
    fetchResource('products'),
    fetchResource('categories'),
    fetchResource('brands'),
  ]);

  return { products, categories, brands };
}

export default async function Dashboard() {
  const data = await fetchDashboardData();

  return (
    <main className="container animate-fade-in">
      <h1>BookMyDSLR Platform</h1>
      <p className="subtitle">Real-time overview of your rental catalog.</p>

      <section className="grid-3 delay-1 animate-fade-in">
        <div className="glass-panel">
          <div className="stat-title">Total Products</div>
          <div className="stat-value">{data.products.count}</div>
          <span className="badge">+ Active Inventory</span>
        </div>

        <div className="glass-panel">
          <div className="stat-title">Categories</div>
          <div className="stat-value">{data.categories.count}</div>
          <span className="badge">Configured Types</span>
        </div>

        <div className="glass-panel">
          <div className="stat-title">Brands Listed</div>
          <div className="stat-value">{data.brands.count}</div>
          <span className="badge">Partnerships</span>
        </div>
      </section>

      <section className="grid-3 delay-2 animate-fade-in">
        <div className="glass-panel" style={{ gridColumn: 'span 3' }}>
          <h2>Recent Products</h2>
          <ul className="recent-list" style={{ marginTop: '1rem' }}>
            {data.products.results.slice(0, 5).map((product) => (
              <li key={product.id || product.name}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {product.image_url && (
                    <img src={product.image_url} alt={product.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--glass-border)' }} />
                  )}
                  <div>
                    <strong>{product.name}</strong>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                      {product.category || 'Gear'} • {product.description?.substring(0, 60) || 'No description'}...
                    </div>
                  </div>
                </div>
                <div style={{ fontWeight: 600 }}>₹{product.price_per_day}/day</div>
              </li>
            ))}
            {data.products.results.length === 0 && (
              <li style={{ color: 'var(--text-secondary)' }}>No products found...</li>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
