const myql = require('mysql2');

const db = myql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
});

module.exports = db.promise();


