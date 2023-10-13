const express = require('express');
const morgan = require('morgan');
const productosController = require('./controllers/productosController');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/productos', productosController);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

app.listen(PORT, () => {
  console.log(`Microservicio Productos ejecutándose en el puerto ${PORT}`);
});
