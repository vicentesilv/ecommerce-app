# servidor

## comandos para correr el servidor

- cd server 
- node install
- npm run dev

## rutas de peticiones al servidor
el servidor se ejecuta en el [http:localhost:3000](http://localhost:3000)  la cual se le considera la ruta raiz o principal

rutas de la api:
- /api/usuarios
- /api/productos
- /api/ordenes
- /api/carrito

## rutas acceso a peticiones de usuarios
- /registro
- /login

### requerimientos de registro
nombre <br>
correo <br>
contrasena
<hr>

### requerimientos 
correo <br>
contrasena

## rutas de acceso a productos

- /crearProducto
- /listarProductos
-/editarProducto/:id

### requerimientos de la ruta crearProducto y editarProducto
nombre <br>
descripcion<br>
precio<br>
stock

## rutas acceso a ordenes
- /crearOrden
- /listarOrdenes
- /orden/:id

### requerimientos de las ordenes
idUsuario<br>
idMetodoPago


## rutas de acceso a carrito
/agregarCarrito
/:idUsuario
/:idCarrito
/vaciar/:idUsuario

### requerimientos agregar carrito
idUsuario <br>
idProducto <br>
cantidad