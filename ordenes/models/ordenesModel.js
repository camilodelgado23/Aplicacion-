const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: '192.168.100.2',
    port: '32000',
    user: 'root',
    password: 'root',
    database: 'almacen'
});
async function crearOrden(orden) {
    const nombreCliente = orden.nombreCliente;
    const emailCliente = orden.emailCliente;
    const totalCuenta = orden.totalCuenta;
    const result = await connection.query('INSERT INTO ordenes VALUES (null, ?, ?, ?, Now())', [nombreCliente, emailCliente, totalCuenta]);
    return result;
}
async function traerOrden(id) {
    const result = await connection.query('SELECT * FROM ordenes WHERE id =  ?', id);
    return result[0];
}
async function traerOrdenes() {
    const result = await connection.query('SELECT * FROM ordenes');
    return result[0];
}
module.exports = {
    crearOrden,
    traerOrden,
    traerOrdenes
};
