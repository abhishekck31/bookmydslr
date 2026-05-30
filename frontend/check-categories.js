const https = require('https');

const url = 'https://abhishek31.pythonanywhere.com/api/products/';

console.log(`Fetching from ${url}...`);

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            const products = json.results;
            const categories = {};
            products.forEach(p => {
                const catName = p.category_detail.name;
                categories[catName] = (categories[catName] || 0) + 1;
            });
            console.log('Categories found:', categories);

            const cameraProducts = products.filter(p => p.category_detail.name.toLowerCase().includes('camera'));
            console.log('Number of "camera" products:', cameraProducts.length);

        } catch (e) {
            console.error('Error:', e.message);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching: ' + err.message);
});
