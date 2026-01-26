const https = require('https');

const url = 'https://abhishek31.pythonanywhere.com/api/products/?category=8';

console.log(`Fetching from ${url}...`);

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            const results = json.results || json;
            console.log(`Received ${results.length} items.`);
            if (results.length > 0) {
                console.log('Sample item category:', results[0].category_detail.name);
            }
        } catch (e) {
            console.error('Error:', e.message);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching: ' + err.message);
});
