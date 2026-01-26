const https = require('https');

const url = 'https://abhishek31.pythonanywhere.com/api/products/?page_size=100';

console.log(`Fetching from ${url}...`);

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            // Check if it's paginated or list
            const results = json.results || json;
            console.log(`Received ${results.length} items.`);

            // Check if we have cameras now
            const cameraProducts = results.filter(p => p.category_detail.name.toLowerCase().includes('camera'));
            console.log('Number of "camera" products:', cameraProducts.length);

        } catch (e) {
            console.error('Error:', e.message);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching: ' + err.message);
});
