
function cargarProductos() {
    fetch('productos.json')    //fetch va y mira lo que hay en el archivo json
      .then(response => response.json())  //then dice, cuando entiendas lo que hay en el archivo json,hasmelo saber
      .then(data => {            //una vez se sabe, then dice, hagamos algo con esta info
        const listaProductos = document.getElementById('productos-lista'); //asigna un lugar en la pagina,para poner productos
  
        data.forEach(producto => {    //para cada elemento del archivo json, hagamos.....
          const listItem = document.createElement('li');  //por cada elemento del jason creamos un li
          listItem.innerHTML = `                    
            <strong>${producto.nombre}</strong>         
            <p>${producto.descripcion_corta}</p>
            <button class="botonAzul" data-id="${producto.id}">Detalles</button>
                
          `;                                                   //aqui se coloca lo que contendra cada li
          listaProductos.appendChild(listItem);         //esto pega el li en la pagina
        });
  
        // Agregar evento de clic a los botones de "Ver Detalles"
        const botonesVerDetalles = document.querySelectorAll('button');  //esto localiza todos los botones de la pagina
        botonesVerDetalles.forEach(boton => {                  //a cada boton encontrado, le quiero asignar una tarea
          boton.addEventListener('click', verDetalle);   // que cuando se le haga click se ejecute "ver detalle"
        });
      });
  }   //aqui termina la funcion cargar productos



  
  // Función, que al hacer click en el boton, busca el ID del producto relacionado al boton, lo guarda en el LStorage, y diracciona a otra url
  function verDetalle(event) {   //esta funcion se ejecuta al hacer click en el boton,event registra lo que sucede al hacer click en el boton
    const idProducto = event.target.getAttribute('data-id'); //esto extrae info especial y unica del boton en cuestion
    localStorage.setItem('productoSeleccionado', idProducto); //almacenamos esa info especial(ID) del boton en el local storage, que luego se leera desde el archivo detalle.js
    window.location.href = 'detalle.html';  //le dice al navegador, que vaya a otra pagina
  }

  cargarProductos();  //esto hace que la pagina cargue automaticamente los productos al cargarse la pagina


  function mostrarDetalle() {
    const idProducto = localStorage.getItem('productoSeleccionado');   //esto encuentra el ID del boton que se guardo en el LStorage
    const detalleProducto = document.getElementById('detalle-producto'); //localiza el elemento html donde se mostrara la informacion
  
    if (idProducto) {      //si, hay un ID en Lstorage......
      fetch('productos.json')  //es el que obtiene los datos de un archivo jason
        .then(response => response.json())
        .then(data => {
          const productoSeleccionado = data.find(producto => producto.id === parseInt(idProducto)); //busca dentro del json el producto con ID coincidente
  
          if (productoSeleccionado) {      //si se encuentra el producto....con innerhtml ponemos sus detalles en la pagina
            detalleProducto.innerHTML = `  
              <h2>${productoSeleccionado.nombre}</h2>          
              <p>${productoSeleccionado.descripcion_detallada}</p>
              <img src="imagenes_productos/${productoSeleccionado.imagen}" alt="${productoSeleccionado.nombre}">
              <h4>Precio: ${productoSeleccionado.precio}</h4>
            `;                                              
          } else {   //sino, mostrar "producto no encontrado"
            detalleProducto.innerHTML = '<p>Producto no encontrado.</p>';
          }
        });
    } else {        //si no se encontro un ID en el Lstorage.....
      detalleProducto.innerHTML = '<p>No se ha seleccionado un producto.</p>';  // mostrar "no se ha seleccionado un producto"
    }
  }
  
  document.getElementById('volver').addEventListener('click', () => {   //agrega evento que al hacer click en el boton...
    window.location.href = 'index.html';   //redirigir a la pagina principal
  });
  
  mostrarDetalle();  //para que los detalles del producto se muestren automáticamente cuando se carga la página.