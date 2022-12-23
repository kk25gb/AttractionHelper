let mysql = require('mysql2')

let db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test',
    multipleStatements: true
})

module.exports = db