// import React, { useState } from 'react';
// import api from '../api/axios';

// const FormularioProducto = () => {
//     const [form, setForm] = useState({
//         nombre: '',
//         descripcion: '',
//         precio: '',
//         stock: '',
//     });
//     const [imagen, setImagen] = useState(null);

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         setImagen(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('nombre', form.nombre);
//         formData.append('descripcion', form.descripcion);
//         formData.append('precio', form.precio);
//         formData.append('stock', form.stock);
//         if (imagen) {
//             formData.append('imagen', imagen);
//         }

//         try {
//             await api.post('/productos/crearProducto', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             alert('Producto creado con éxito');
//         } catch (error) {
//             console.error('Error al crear el producto:', error);
//             alert('Error al crear el producto');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Crear Producto</h2>
//             <input
//                 type="text"
//                 name="nombre"
//                 placeholder="Nombre"
//                 value={form.nombre}
//                 onChange={handleChange}
//                 required
//             />
//             <textarea
//                 name="descripcion"
//                 placeholder="Descripción"
//                 value={form.descripcion}
//                 onChange={handleChange}
//                 required
//             ></textarea>
//             <input
//                 type="number"
//                 name="precio"
//                 placeholder="Precio"
//                 value={form.precio}
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="number"
//                 name="stock"
//                 placeholder="Stock"
//                 value={form.stock}
//                 onChange={handleChange}
//                 required
//             />
//             <input type="file" onChange={handleFileChange} />
//             <button type="submit">Crear Producto</button>
//         </form>
//     );
// };

// export default FormularioProducto;
