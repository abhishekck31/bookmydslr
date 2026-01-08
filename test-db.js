
const { Client } = require('pg');

const connectionString = "postgresql://neondb_owner:npg_ShTX3QZaR1MG@ep-quiet-haze-a44enm2p-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";

console.log('Testing connection to hardcoded URL:', connectionString.split('@')[1]);

const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => {
        console.log('✅ Connected successfully to PostgreSQL');
        return client.query('SELECT NOW()');
    })
    .then(res => {
        console.log('✅ Server time:', res.rows[0]);
        return client.end();
    })
    .catch(err => {
        console.error('❌ Connection error:', err);
        client.end();
    });
