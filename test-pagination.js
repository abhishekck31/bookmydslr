const https = require('https');

const API_BASE_URL = "https://abhishek31.pythonanywhere.com/api";

function fetchAPI(endpoint) {
    return new Promise((resolve, reject) => {
        let url;
        if (endpoint.startsWith('http')) {
            url = endpoint;
        } else {
            const baseUrl = API_BASE_URL.replace(/\/$/, '');
            const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
            url = `${baseUrl}${path}`;
        }

        console.log(`Fetching ${url}...`);

        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    console.error('JSON parse error');
                    resolve(null);
                }
            });
        }).on('error', err => {
            console.error('Fetch error:', err);
            resolve(null);
        });
    });
}

async function fetchAllProducts() {
    let allProducts = [];
    let nextUrl = '/products/';
    let pages = 0;

    while (nextUrl) {
        pages++;
        const data = await fetchAPI(nextUrl);
        if (!data || !data.results) break;

        allProducts = [...allProducts, ...data.results];
        nextUrl = data.next;
        console.log(`Page ${pages} done. Total products: ${allProducts.length}`);
    }

    console.log(`Total products fetched: ${allProducts.length}`);

    // Check for cameras
    const cameras = allProducts.filter(p =>
        (p.category_detail && p.category_detail.name.toLowerCase().includes('camera')) ||
        (p.name && p.name.toLowerCase().includes('camera'))
    );
    console.log(`Cameras found: ${cameras.length}`);
    if (cameras.length > 0) {
        console.log('Sample camera:', cameras[0].name);
    }
}

fetchAllProducts();
