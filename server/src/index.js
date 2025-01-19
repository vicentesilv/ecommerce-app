const {app, puerto} = require('./app');
const cors = require('cors');

app.use(cors());

app.listen(puerto, () => console.log(`servidor corriendo en el puerto ${puerto}...\n http://localhost:${puerto}`));