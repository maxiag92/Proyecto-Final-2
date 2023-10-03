
function cargarProductos() {
    fetch('productos.json')    
      .then(response => response.json())  
      .then(data => {            
        const listaProductos = document.getElementById('productos-lista'); 
  
        data.forEach(producto => {    
          const listItem = document.createElement('li');  
          listItem.innerHTML = `                    
            <strong>${producto.nombre}</strong>         
            <p>${producto.descripcion_corta}</p>
            <button class="botonAzul" data-id="${producto.id}">Detalles</button>
                
          `;                                                   
          listaProductos.appendChild(listItem);         
        });
  
        
        const botonesVerDetalles = document.querySelectorAll('button');  
        botonesVerDetalles.forEach(boton => {                  
          boton.addEventListener('click', verDetalle);   
        });
      });
  }   

  function verDetalle(event) {   
    const idProducto = event.target.getAttribute('data-id'); 
    localStorage.setItem('productoSeleccionado', idProducto); 
    window.location.href = 'detalle.html'; 
  }

  cargarProductos(); 


  function mostrarDetalle() {
    const idProducto = localStorage.getItem('productoSeleccionado');   
    const detalleProducto = document.getElementById('detalle-producto'); 
  
    if (idProducto) {     
      fetch('productos.json')  
        .then(response => response.json())
        .then(data => {
          const productoSeleccionado = data.find(producto => producto.id === parseInt(idProducto)); 
  
          if (productoSeleccionado) {      
            detalleProducto.innerHTML = `  
              <h2>${productoSeleccionado.nombre}</h2>          
              <p>${productoSeleccionado.descripcion_detallada}</p>
              <img src="imagenes_productos/${productoSeleccionado.imagen}" alt="${productoSeleccionado.nombre}">
              <h4>Precio: ${productoSeleccionado.precio}</h4>
            `;                                              
          } else {   
            detalleProducto.innerHTML = '<p>Producto no encontrado.</p>';
          }
        });
    } else {        
      detalleProducto.innerHTML = '<p>No se ha seleccionado un producto.</p>';  
    }
  }
  
  document.getElementById('volver').addEventListener('click', () => {  
    window.location.href = 'index.html';  
  });
  
  mostrarDetalle();  
