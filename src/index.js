const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const animeRoutes = require('./routes/anime');

const app = express();
const PORT = 3001;

// Configura el middleware para manejar solicitudes JSON
app.use(express.json());
// Configura CORS para permitir solicitudes desde http://localhost:5173
app.use(cors());

// Configura las rutas del anime
app.use('/api/anime', animeRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend iniciado en http://localhost:${PORT}`);
});
