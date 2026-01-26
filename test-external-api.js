const https = require('https');

const url = 'https://abhishek31.pythonanywhere.com/api/products/';

console.log(`Fetching from ${url}...`);

https.get(url, (res) => {
    let data = '';
    console.log('Status Code:', res.statusCode);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('Data received:', JSON.stringify(json, null, 2).substring(0, 500) + '...');
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
            console.log('Raw data:', data.substring(0, 500));
        }
    });

}).on('error', (err) => {
    console.error('Error fetching: ' + err.message);
});
