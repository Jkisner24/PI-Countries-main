const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const country = require("./country");
const activities = require("./activities");

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/', country);
router.use('/', activities);


module.exports = router;
