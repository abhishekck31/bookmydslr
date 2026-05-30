const https = require('https');

const url = 'https://abhishek31.pythonanywhere.com/api/categories/';

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
            console.log('Categories:', results.map(c => `${c.id}: ${c.name}`));
        } catch (e) {
            console.error('Error:', e.message);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching: ' + err.message);
});
