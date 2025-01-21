const myql = require('mysql2');

const db = myql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce2'
});

module.exports = db.promise();


