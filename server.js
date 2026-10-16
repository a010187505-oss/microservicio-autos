const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Datos simulados (Catálogo en memoria)
const catalogoAutos = [
    { id: 1, marca: 'Toyota', modelo: 'Corolla', anio: 2022, precio: 25000, color: 'Blanco' },
    { id: 2, marca: 'Honda', modelo: 'Civic', anio: 2023, precio: 27000, color: 'Negro' },
    { id: 3, marca: 'Ford', modelo: 'Mustang', anio: 2021, precio: 45000, color: 'Rojo' },
    { id: 4, marca: 'Chevrolet', modelo: 'Camaro', anio: 2022, precio: 43000, color: 'Amarillo' },
    { id: 5, marca: 'Nissan', modelo: 'Sentra', anio: 2023, precio: 24000, color: 'Gris' }
];

// Ruta base
app.get('/', (req, res) => {
    res.send('Bienvenido al Microservicio del Catálogo de Autos');
});

// Endpoint: Obtener todos los autos
app.get('/api/autos', (req, res) => {
    res.status(200).json({
        success: true,
        total: catalogoAutos.length,
        data: catalogoAutos
    });
});

// Endpoint: Obtener un auto por ID con manejo de errores
app.get('/api/autos/:id', (req, res) => {
    const autoId = parseInt(req.params.id);
    const auto = catalogoAutos.find(a => a.id === autoId);

    if (auto) {
        res.status(200).json({ success: true, data: auto });
    } else {
        res.status(404).json({ success: false, mensaje: 'Automóvil no encontrado en el catálogo' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servicio corriendo en el puerto ${port}`);
});