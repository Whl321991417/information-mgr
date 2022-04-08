const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    user: 'wangbo',
    password: '123456',
    database: 'ifomanage'
});

// 导出 配置好的 连接池对象！
// export default pool
module.exports = pool